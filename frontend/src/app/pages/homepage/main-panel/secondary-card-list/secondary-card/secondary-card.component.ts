import { Component, Input, OnInit } from '@angular/core';
import { RecipeModel } from 'src/app/global/models/recipes/recipe.model';

@Component({
  selector: 'app-secondary-card',
  templateUrl: './secondary-card.component.html',
  styleUrls: ['./secondary-card.component.scss']
})
export class SecondaryCardComponent implements OnInit {

  @Input() recipe!: RecipeModel;
  fontSize!: string;


  constructor() { }

  ngOnInit(): void {
    if (this.recipe.name.length > 35) {
      this.fontSize = "1vw";
    }
    else if (this.recipe.name.length > 20) {
      this.fontSize = "1.2vw";
    }
    else {
      this.fontSize = "1.5vw";
    }
  }


}
