import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { RecipeModel } from 'src/app/global/models/recipes/recipe.model';
import { RecipesService } from 'src/app/global/services/recipes/recipes.service';
import { CountdownTimerComponent } from './countdown-timer/countdown-timer.component';

declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-cooking',
  templateUrl: './cooking.component.html',
  styleUrls: ['./cooking.component.scss']
})
export class CookingComponent implements OnInit {
  @Input() mainRecipe!: RecipeModel;
  totalSteps: number = 0;
  currentStep: number = -1;
  recipeDone: boolean = false;
  recognition = new webkitSpeechRecognition();
  voiceActive = true;
  timers: {step: number; amount: number, show: boolean}[] = [];

  constructor(private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.totalSteps = this.mainRecipe.steps.length-1;
    this.currentStep = 0;
    for (let i=0; i < this.mainRecipe.steps.length; i++) {
      let step = this.mainRecipe.steps[i];
      if (step.timer !== undefined) {
        this.timers.push({step: i, amount: step.timer, show: false})
      }
    }
    console.log(this.timers);
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
      if( phrase.includes("next") || phrase.includes("next step")){
        this.nextStep();
      } else if( phrase.includes("previous") || phrase.includes("previous step")){
        this.prevStep();
      } else if (phrase.includes("stop recording")) {
        this.voice();
      }
    }
  }

  nextStep(): void {
    if (this.currentStep < this.totalSteps) {
      this.recipesService.publish("step", ++this.currentStep);
      this.showTimer(this.currentStep);
    }
  }

  prevStep(): void {
    if (this.currentStep > 0) {
      this.recipesService.publish("step", --this.currentStep);
      this.showTimer(this.currentStep)
    }
  }

  showTimer(step: Number): void {
    let index = this.timers.findIndex(e => e.step === step);
    console.log(index);
    if (index !== -1) {
      this.timers[index].show = true;
    }
  }

  destroyTimer(step: Number): void {
    let index = this.timers.findIndex(e => e.step === step);
    if (index !== -1) {
      this.timers[index].show = false;
    }
  }

  playVideo(url: string | undefined): void {
    if (url !== undefined) {
      
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
        if (phrase.includes("next") || phrase.includes("next step")){
          this.nextStep();
        } else if (phrase.includes("previous") || phrase.includes("previous step")){
          this.prevStep();
        } else if (phrase.includes("stop recording")) {
          this.voice();
        }
      }
    }
    else {
      this.recognition.stop();
    }
  }

}
