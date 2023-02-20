import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BacksplashComponent } from './backsplash.component';
import { BacksplashRoutingModule } from './backsplash-routing.module';
import { PreppingBacksplashComponent } from './prepping-backsplash/prepping-backsplash.component';
import { CookingBacksplashComponent } from './cooking-backsplash/cooking-backsplash.component';
import { ProgressBarComponent } from './cooking-backsplash/progress-bar/progress-bar.component';



@NgModule({
  declarations: [
    BacksplashComponent,
    PreppingBacksplashComponent,
    CookingBacksplashComponent,
    ProgressBarComponent
  ],
  imports: [
    CommonModule,
    BacksplashRoutingModule,
  ],
  exports: [
    BacksplashComponent
  ]
})
export class BacksplashModule { }
