import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeModel } from 'src/app/global/models/recipes/recipe.model';
import { RecipesService } from 'src/app/global/services/recipes/recipes.service';

@Component({
  selector: 'app-backsplash',
  templateUrl: './backsplash.component.html',
  styleUrls: ['./backsplash.component.scss']
})
export class BacksplashComponent implements OnInit {

  recipe: RecipeModel | undefined;
  currentModule!: string;

  constructor(private recipesService: RecipesService, private router: Router) {
    this.currentModule = 'homepage';
  }


  ngOnInit(): void {

    this.recipesService.subscribe("main_recipe", (recipe: RecipeModel) => {
      this.recipe = recipe;
    });

    this.recipesService.subscribe("mainModule", (currentModule: string) => {
      console.log('currentmodule: '+currentModule);
      this.currentModule = currentModule;
    })
  }
}
