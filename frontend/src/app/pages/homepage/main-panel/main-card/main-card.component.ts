import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { RecipeModel } from 'src/app/global/models/recipes/recipe.model';

@Component({
  selector: 'app-main-card',
  templateUrl: './main-card.component.html',
  styleUrls: ['./main-card.component.scss']
})
export class MainCardComponent implements OnInit {

  @Input() mainRecipe!: RecipeModel;
  // @Input() mainRecipe?: RecipeModel;

  @Output() recipeEvent = new EventEmitter<RecipeModel>();

  constructor() {
  }

  ngOnInit(): void {
    //this.mainRecipe.name = 'toast';
  }

  ngOnChanges(change: SimpleChanges) {
  }

  updateChosenRecipe(event: any) {
    this.recipeEvent.emit(event);
  }

  getRecipe(): RecipeModel | null{
      return this.mainRecipe;
    }

  setRecipe(recipe: RecipeModel): void {
    this.mainRecipe = recipe;
  }
}
