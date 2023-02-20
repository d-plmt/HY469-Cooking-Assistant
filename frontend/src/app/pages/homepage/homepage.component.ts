import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CupboardModel } from 'src/app/global/models/contents/cupboard.model';
import { FridgeModel } from 'src/app/global/models/contents/fridge.model';
import { RecipeModel } from 'src/app/global/models/recipes/recipe.model';
import { RecipesService } from 'src/app/global/services/recipes/recipes.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  @Output() preppingRecipe = new EventEmitter<RecipeModel>();

  recipes: RecipeModel[] = [];
  chosenRecipe: RecipeModel | undefined;

  occasionArray: { name: string; checked: boolean; }[] = [];
  tagsArray: {name: string, checked: boolean}[] = [];
  favorites:boolean=false;

  fridgeContents: FridgeModel[] = [
    {ingredient: "butter"},
    {ingredient: "egg", ingredientPlural: "eggs"},
    {ingredient: "milk"},
    {ingredient: "almond milk"},
    {ingredient: "banana", ingredientPlural: "bananas"},
    {ingredient: "apple", ingredientPlural: "apples"},
    {ingredient: "tomato", ingredientPlural: "tomatoes"},
    {ingredient: "cucumber", ingredientPlural: "cucumbers"},
    {ingredient: "avocado", ingredientPlural: "avocados"},
    {ingredient: "bell pepper", ingredientPlural: "bell peppers"},
    {ingredient: "lettuce leaf", ingredientPlural: "lettuce leaves"},
    {ingredient: "lemon juice"},
    {ingredient: "lemon", ingredientPlural: "lemons"},
    {ingredient: "onion", ingredientPlural: "onions"},
    {ingredient: "spring onion", ingredientPlural: "spring onions"},
    {ingredient: "garlic"},
    {ingredient: "mozzarella cheese"},
    {ingredient: "emmental cheese"},
    {ingredient: "parmesan cheese"},
    {ingredient: "pecorino romano"},
    {ingredient: "feta cheese"},
    {ingredient: "greek yoghurt"},
    {ingredient: "ham"},
    {ingredient: "chicken breast", ingredientPlural: "chickean breasts"},
    {ingredient: "whole chicken"},
    {ingredient: "bacon"},
    {ingredient: "minced beef"},
    {ingredient: "beer"},
    {ingredient: "peas and carrots"},
    {ingredient: "carrots"},
    {ingredient: "fennel"},
    {ingredient: "water"}
  ];
  cupboardContents: CupboardModel[] = [
    {ingredient: "salt"},
    {ingredient: "sea salt"},
    {ingredient: "pepper"},
    {ingredient: "black pepper"},
    {ingredient: "whole grain bread"},
    {ingredient: "white bread"},
    {ingredient: "tortilla", ingredientPlural: "tortillas"},
    {ingredient: "burger bun", ingredientPlural: "burger buns"},
    {ingredient: "pita bread"},
    {ingredient: "oil"},
    {ingredient: "sunflower oil"},
    {ingredient: "olive oil"},
    {ingredient: "coconut oil"},
    {ingredient: "peanut oil"},
    {ingredient: "sesame oil"},
    {ingredient: "ground cumin"},
    {ingredient: "sugar"},
    {ingredient: "granulated sugar"},
    {ingredient: "stevia"},
    {ingredient: "flour"},
    {ingredient: "all purpose flour"},
    {ingredient: "self-rising flour"},
    {ingredient: "baking powder"},
    {ingredient: "maple syrup"},
    {ingredient: "chia seeds"},
    {ingredient: "hemp seeds"},
    {ingredient: "shredded coconut"},
    {ingredient: "hot sauce"},
    {ingredient: "soy sauce"},
    {ingredient: "honey"},
    {ingredient: "dijon mustard"},
    {ingredient: "chickpeas"},
    {ingredient: "brown rice"},
    {ingredient: "white rice"},
    {ingredient: "olives"},
    {ingredient: "mixed dried herbs"},
    {ingredient: "spaghetti"},
    {ingredient: "vanilla extract"},
    {ingredient: "cocoa powder"},
    {ingredient: "dark chocolate"},
    {ingredient: "cinnamon"},
    {ingredient: "walnuts"},
    {ingredient: "french baguette"}
  ];


  constructor(
    private recipesService: RecipesService, private router: Router) {
  }

  ngOnInit(): void {
    this.recipesService.getAll().subscribe((result) => {
      this.recipes = result;
      this.checkIngredientsAvailable();
    });
    this.chosenRecipe = undefined;


  }

  checkIngredientsAvailable(): void {
    for (let recipe of this.recipes) {
      recipe.allIngredientsAvailable = true;
      for (let ingredient of recipe.ingredients) {
        ingredient.ingrAvailable = true;
        let lowerCaseIngr = ingredient.ingredient.toLowerCase();
        lowerCaseIngr = lowerCaseIngr.split(',')[0];
        let lowerCaseAlt = "";
        if (ingredient.alternative !== undefined) {
          lowerCaseAlt = ingredient.alternative!.toLowerCase();
          lowerCaseAlt = lowerCaseAlt.split(',')[0];
          ingredient.altAvailable = true;
        }
        if (this.fridgeContents.some(ingr => ingr.ingredient === lowerCaseIngr)
        || this.fridgeContents.some(ingr => ingr.ingredientPlural === lowerCaseIngr)) {
          ingredient.location = "fridge";
          continue;
        }
        if (this.cupboardContents.some(ingr => ingr.ingredient === lowerCaseIngr)
        || this.cupboardContents.some(ingr => ingr.ingredientPlural === lowerCaseIngr)) {
          ingredient.location = "cupboard";
          continue;
        }
        ingredient.ingrAvailable = false;
        if (this.fridgeContents.some(ingr => ingr.ingredient === lowerCaseAlt)
        || this.fridgeContents.some(ingr => ingr.ingredientPlural === lowerCaseAlt)) {
          ingredient.location = "fridge";
          continue;
        }
        if (this.cupboardContents.some(ingr => ingr.ingredient === lowerCaseAlt)
        || this.cupboardContents.some(ingr => ingr.ingredientPlural === lowerCaseAlt)) {
          ingredient.location = "cupboard;"
          continue;
        }
        ingredient.location = "abyss";
        ingredient.altAvailable = false;
        recipe.allIngredientsAvailable = false;
      }
      for (let ingredient of recipe.ingredients) {
        if (!ingredient.ingrAvailable && !ingredient.altAvailable) {
        }
      }
    }
  }

  updateTags(tagsArray: object) {
    this.tagsArray = JSON.parse(JSON.stringify(tagsArray));
  }

  updateOccasion(occasionArray: object) {
    this.occasionArray = JSON.parse(JSON.stringify(occasionArray));
  }

  updateFavorites(favorites:object){
    this.favorites = JSON.parse(JSON.stringify(favorites));

  }
  recipeSummary(event: any) {
    this.chosenRecipe = event;
    // this.preppingRecipe.emit(this.chosenRecipe);
    // this.router.navigate([`recipe/${event.name}`]);
  }

  startCooking(event: any) {
    this.preppingRecipe.emit(event);
  }

  reset() {
    this.chosenRecipe = undefined;
  }

}
