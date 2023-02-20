import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { RecipeModel } from 'src/app/global/models/recipes/recipe.model';

@Component({
  selector: 'app-secondary-card-list',
  templateUrl: './secondary-card-list.component.html',
  styleUrls: ['./secondary-card-list.component.scss']
})
export class SecondaryCardListComponent implements OnInit {

  @Input() cardListRecipes: RecipeModel[] = [];
  @Output() recipeEvent = new EventEmitter<RecipeModel>();


  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
  }

  updateChosenRecipe(event: any) {
    this.recipeEvent.emit(event);
  }

}
