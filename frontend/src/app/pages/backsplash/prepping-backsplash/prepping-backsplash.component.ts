import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeModel } from 'src/app/global/models/recipes/recipe.model';
import { RecipesService } from 'src/app/global/services/recipes/recipes.service';

@Component({
  selector: 'app-prepping-backsplash',
  templateUrl: './prepping-backsplash.component.html',
  styleUrls: ['./prepping-backsplash.component.scss']
})
export class PreppingBacksplashComponent implements OnInit {

  @Input() recipe!: RecipeModel;
  showAlts: boolean = false;
  fridgeIngredients: {ingredient: string, alternative?: string}[] = [];
  cupboardIngredients: {ingredient: string, alternative?: string}[] = [];
  abyssIngredients: {ingredient: string, alternative?: string}[] = [];

  constructor(private recipesService: RecipesService, private router: Router) {

  }


  ngOnInit(): void {

    for (let ingredient of this.recipe.ingredients) {
      if (ingredient.location === 'fridge') {
        this.fridgeIngredients.push({'ingredient': ingredient.ingredient, 'alternative': ingredient.alternative});
        continue;
      }
      if (ingredient.location === 'cupboard') {
        this.cupboardIngredients.push({'ingredient': ingredient.ingredient, 'alternative': ingredient.alternative});
        continue;
      }
      this.abyssIngredients.push({'ingredient': ingredient.ingredient, 'alternative': ingredient.alternative});
    }

    this.recipesService.subscribe("cooking", (recipe: RecipeModel) => {
      if (recipe.name !== undefined) {
        this.router.navigate(['cookingBacksplash']);
        return;
      }

    })

    this.recipesService.subscribe("ing_name", (ing_name: string) => {
      this.checkIngredient(ing_name);
    });

    this.recipesService.subscribe("showAlts", (showAlts: boolean) => {
      this.showAlts = showAlts;
    })
  }



  ngOnChanges(change: SimpleChanges) {
  }

  checkIngredient(ing_name: string): void {
    console.log('empike');

    $("input[value='" + ing_name + "']").prop('checked', !$("input[value='" + ing_name + "']").prop('checked'));
  }
}
