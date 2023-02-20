import { Component, Input, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RecipeModel } from 'src/app/global/models/recipes/recipe.model';
import { RecipesService } from 'src/app/global/services/recipes/recipes.service';
import Swal from 'sweetalert2';

// Speech Recognition
declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-recipe-summary',
  templateUrl: './recipe-summary.component.html',
  styleUrls: ['./recipe-summary.component.scss']
})
export class RecipeSummaryComponent implements OnInit {

  @Input() recipe = new RecipeModel();
  @Output() reset = new EventEmitter<undefined>();
  @Output() start = new EventEmitter<RecipeModel>();
  recipeName = "";
  showAlert = "";
  proceed = false;
  voiceActive = true;

  constructor(private location: Location, private recipesService: RecipesService, private router: Router) {
  }

  // Speech Recognition instance
  recognition = new webkitSpeechRecognition();

  ngOnInit(): void {

    if (this.recipe !== undefined) {
      for (let ingredient of this.recipe.ingredients) {
        if (!ingredient.ingrAvailable && !ingredient.altAvailable) {
          this.showAlert =  "ingredientsmissing";
          break;
        }
        if (!ingredient.ingrAvailable && ingredient.altAvailable) {
          this.showAlert = "alternatives";
        }
      }
    }

    // Set Up recognition variable
    this.recognition.lang = 'en-US';
    this.recognition.continuous = true;


    this.recognition.start();

    this.recognition.onresult = (event: { results: string | any[]; }) => {
      // Catch the next phrase every time
      let phrase = event.results[event.results.length-1][0].transcript;
      // Continue with console.logging
      console.log(phrase);
      // If it catches start cooking, then saveRecipe()
      if( phrase.includes("start cooking") ){
        this.saveRecipe();
      } else if (phrase.includes("proceed")) {
        this.proceed = true;
      } else if (phrase.includes("stop recording")) {
        this.voice();
      }
    }
  }

  back(): void {
    this.reset.emit(undefined);
  }


  saveRecipe(): void {
    let swalText = "";
    let swalColor = "";
    if (this.showAlert === "ingredientsmissing") {
      swalText = "Some ingredients could not be found in the Fridge and Cupboard. Do you wish to proceed?";
      swalColor = "red";
    }
    else if (this.showAlert === "alternatives") {
      swalText = "Some alternatives must be used for this recipe. Do you wish to proceed?"
      swalColor = "#FFD500";
    }

    if (this.showAlert !== "") {
      Swal.fire({
        title: 'Warning!',
        text: swalText,
        icon: 'warning',
        showCancelButton: true,
        background: '#FFFDF2',
        color: "black",
        allowOutsideClick: false,
        confirmButtonText: 'Proceed',
        confirmButtonColor: '#FFD500',
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed || this.proceed) {
          this.recipesService.publish("main_recipe", this.recipe);
          // this.router.navigate(['/prepingPage', this.recipe.name]);
          this.start.emit(this.recipe);

        }
      })
    }
    else {
      this.recipesService.publish("main_recipe", this.recipe);
      // this.router.navigate(['/prepingPage', this.recipe.name]);
      this.start.emit(this.recipe);
    }



  }

  AddtoF(): void{
    let fav=document.getElementById('add') as HTMLElement;
    let heart=document.getElementById('h') as HTMLElement;
    if(fav.textContent==="Add to Favorites"){
     fav.textContent="Favorite Recipe";
     fav.style.paddingLeft="10px";
     heart.style.color="red";
    }else if(fav.textContent==="Favorite Recipe") {
    fav.textContent="Add to Favorites";
    fav.style.paddingLeft="10px";
    heart.style.color="darkgray";
    }else{
      fav.textContent="Favorite Recipe";
      fav.style.paddingLeft="10px";
      heart.style.color="red";



    }
  }
  RemfromF(): void{
    let rem=document.getElementById('remove') as HTMLElement;
    let heart=document.getElementById('hf') as HTMLElement;
    if(rem.textContent==="Favorite Recipe"){
     rem.textContent="Add to Favorites";
     rem.style.paddingLeft="10px";
     heart.style.color="darkgray";
    }else if(rem.textContent==="Add to Favorites") {
    rem.textContent="Favorite Recipe";
    rem.style.paddingLeft="10px";
    heart.style.color="red";
    }else{
      rem.textContent="Add to Favorites";
      rem.style.paddingLeft="10px";
      heart.style.color="darkgray";

    }

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
        if( phrase.includes("start cooking") ){
          this.saveRecipe();
        } else if (phrase.includes("proceed")) {
          this.proceed = true;
        } else if (phrase.includes("stop recording")) {
          this.voice();
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
