import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeModel } from 'src/app/global/models/recipes/recipe.model';
import { RecipesService } from 'src/app/global/services/recipes/recipes.service';
import Swal from 'sweetalert2';

// Speech Recognition
declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-prepping',
  templateUrl: './prepping.component.html',
  styleUrls: ['./prepping.component.scss']
})
export class PreppingComponent implements OnInit {

  @Output() home = new EventEmitter<String>();
  @Output() cook = new EventEmitter<String>();
  @Input() mainRecipe = new RecipeModel();
  showAlts: boolean = false;
  totalIngredients = 0;
  placedIngredients = 0;
  voiceActive = true;

  constructor(private recipesService: RecipesService, private router: Router) {

  }

  test?: string;
  // Speech Recognition instance
  recognition = new webkitSpeechRecognition();

  ngOnInit(): void {
    this.totalIngredients = this.mainRecipe.ingredients.length;

    // Set Up recognition variable
    this.recognition.lang = 'en-US';
    this.recognition.continuous = true;


    this.recognition.start();

    this.recognition.onresult = (event) => {
      // Catch the next phrase every time
      let phrase = event.results[event.results.length-1][0].transcript;
      // Continue with console.logging
      console.log(phrase);
      // If it catches start cooking, then saveRecipe()
      if( phrase.includes("proceed") ){
        this.proceed();
      } else if( phrase.includes("alternatives") ){
        this.alternatives();
      } else if( phrase.includes("cancel") ){
        this.goHome();
      }
    }
  }

  goHome(): void {
    this.home.emit('home');
  }

  alternatives(): void {
    this.showAlts = !this.showAlts;
    this.recipesService.publish("showAlts", this.showAlts);
  }

  // Get me to the cooking page function
  proceed(): void {
    if (this.placedIngredients < this.totalIngredients) {
      Swal.fire({
        title: 'Warning!',
        text: 'Some ingredients have not been placed yet. Proceed anyway?',
        icon: 'warning',
        showCancelButton: true,
        background: '#FFFDF2',
        color: "black",
        allowOutsideClick: false,
        confirmButtonText: 'Proceed',
        confirmButtonColor: '#FFD500',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.cook.emit('cooking');
        }
      })
    }
    else {
      this.cook.emit('cooking');
    }
  }

  getRecipeModel(): RecipeModel{
    return this.mainRecipe;
  }

  voice(): void {
    this.voiceActive = !this.voiceActive;

    if (this.voiceActive) {
      this.recognition.start();

      this.recognition.onresult = (event) => {
        // Catch the next phrase every time
        let phrase = event.results[event.results.length-1][0].transcript;
        // Continue with console.logging
        console.log(phrase);
        // If it catches start cooking, then saveRecipe()
        if( phrase.includes("proceed") ){
          this.proceed();
        } else if (phrase.includes("alternatives")) {
          this.alternatives();
        } else if (phrase.includes("cancel")) {
          this.goHome();
        }
      }
    }
    else {
      this.recognition.stop();
    }
  }

  ngOnDestroy(){
    this.recognition.stop();
  }
}
