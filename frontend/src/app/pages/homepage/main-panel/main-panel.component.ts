import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { RecipeModel } from 'src/app/global/models/recipes/recipe.model';
import { findMainRecipe } from 'src/assets/scripts/recipeFinder';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements OnInit {

  @Input() recipes: RecipeModel[] = [];
  @Input() tagsArray: {name: string, checked: boolean}[] = [];
  @Input() occasionArray: {name: string, checked: boolean}[] = [];
  @Input() favorites:boolean=false;
  @Output() chosenRecipe = new EventEmitter<RecipeModel>();


  mainRecipe: RecipeModel = new RecipeModel;
  cardListRecipes: RecipeModel[] = [];
  matchingRecipes: RecipeModel[] = [];
  occasion: string = "";
  tags: string[] = [];
  favs:boolean=false;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('occasionArray')) {
      for (let occasion of this.occasionArray) {  //vriskei se ti occasion eimaste
        if (occasion.checked) {
          this.occasion = occasion.name;
          break;
        }
      }
    }
    if (changes.hasOwnProperty('tagsArray')) {
      this.tags = [];
      for (let tag of this.tagsArray) {
        if (tag.checked) {
          this.tags.push(tag.name);
        }
      }
    }
    if(changes.hasOwnProperty('favorites')){
      this.favs = this.favorites;
    }
    this.updateRecipes();
  }


  updateRecipes(): void {

    this.mainRecipe = new RecipeModel;
    this.cardListRecipes = [];
    this.matchingRecipes = [];

    if (this.recipes.length <= 0) { return; }

    for (let recipe of this.recipes) {
      if (!recipe.occasion.includes(this.occasion)) {
        continue;
      }

      let flag = 1;
      if (this.tags.length > 0) {
        flag = 0;
        for (let tag of this.tags) {
          if (recipe.tags.includes(tag)) {
            flag = 1;
            break;
          }
        }
      }
      if (this.favs && flag) {  //mono favorites me swsta tags
        flag = 0;
        if (recipe.favorite) {
          flag = 1;
        }
      }

      if (flag) {
        this.matchingRecipes.push(recipe);
      }
    }

    if (this.matchingRecipes.length > 0)  {
      this.mainRecipe = findMainRecipe(this.matchingRecipes);
      let name = this.mainRecipe.name;

      this.matchingRecipes.splice(this.matchingRecipes.findIndex(function(i){ //pop from matching recipes
        return i.name === name;
      }), 1);


    }
    this.cardListRecipes = this.matchingRecipes;


  }

  updateChosenRecipe(event: any) {
    this.chosenRecipe.emit(event);
  }

}
