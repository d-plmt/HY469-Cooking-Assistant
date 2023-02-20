import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookingComponent } from './cooking.component';
import { CountdownTimerComponent } from './countdown-timer/countdown-timer.component';



@NgModule({
  declarations: [
    CookingComponent,
    CountdownTimerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CookingComponent
  ]
})
export class CookingModule { }
