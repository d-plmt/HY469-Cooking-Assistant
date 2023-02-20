import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import * as moment from 'moment';
import { RecipesService } from 'src/app/global/services/recipes/recipes.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  @Output() home = new EventEmitter<String>();

  public time = moment().format('h:mm A');
  hours: number = Number(moment().format('HH'));
  showWelcome = true;
  welcomeText = "";

  constructor(private router: Router, private recipesService: RecipesService) {
    setInterval(() => {
      this.time = moment().format('h:mm A');
      this.hours = Number(moment().format('HH'));
      if (this.hours >= 4 && this.hours < 12) {
        this.welcomeText = "Good Morning";
      }
      else if (this.hours >= 12 && this.hours < 17) {
        this.welcomeText = "Good Afternoon";
      }
      else {
        this.welcomeText = "Good Evening";
      }
    }, 1);
   }

  ngOnInit(): void {

    this.router.events.subscribe(event =>{
      if (event instanceof NavigationStart){
         if (event.url !== '/homepage') {
          this.showWelcome = false;
         }
         else {
          this.showWelcome = true;
         }
      }
   })

  }

  goHome(): void {
    this.home.emit('home');
    // this.recipesService.publish("main_recipe", {});
    // this.recipesService.publish("summary", {});
    // this.recipesService.publish("cooking", {});
    // this.recipesService.publish("step", 0);
  }
}
