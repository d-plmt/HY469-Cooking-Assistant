import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreppingComponent } from './prepping.component';
import { IngrBtnComponent } from './ingr-btn/ingr-btn.component';



@NgModule({
  declarations: [
    PreppingComponent,
    IngrBtnComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PreppingComponent
  ]
})
export class PreppingModule { }
