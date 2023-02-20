import { Component, Input, OnInit } from '@angular/core';
import { RecipeModel } from 'src/app/global/models/recipes/recipe.model';
import { RecipesService } from 'src/app/global/services/recipes/recipes.service';

@Component({
  selector: 'app-cooking-backsplash',
  templateUrl: './cooking-backsplash.component.html',
  styleUrls: ['./cooking-backsplash.component.scss']
})
export class CookingBacksplashComponent implements OnInit {

  @Input()
  recipe!: RecipeModel;
  totalSteps: number = 0;
  currentStep: number = 0;

  constructor(private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.totalSteps = this.recipe.steps.length-1;
    this.currentStep = 0;

    this.recipesService.subscribe("step", (step: number) => {
      this.currentStep = step;
    })
  }

}
