import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { RecipesService } from 'src/app/global/services/recipes/recipes.service';

@Component({
  selector: 'app-ingr-btn',
  templateUrl: './ingr-btn.component.html',
  styleUrls: ['./ingr-btn.component.scss']
})
export class IngrBtnComponent implements OnInit {

  @Input() ingredient: { ingredient: string; alternative?: string | undefined; amount?: string | undefined; } | undefined;
  @Input() showAlternatives: boolean = false;

  checked: boolean = false;



  constructor(private recipeService: RecipesService) {
  }

  ngOnInit(): void {
  }

  checkIngredient(text: any): void {


    const button = document.getElementById(text);
    this.checked = !this.checked;
    this.recipeService.publish("ing_name", text);
  }

  ngOnChanges(change: SimpleChanges) {
  }

}
