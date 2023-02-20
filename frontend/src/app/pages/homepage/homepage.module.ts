import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { MainCardComponent } from './main-panel/main-card/main-card.component';
import { SecondaryCardListComponent } from './main-panel/secondary-card-list/secondary-card-list.component';
import { SecondaryCardComponent } from './main-panel/secondary-card-list/secondary-card/secondary-card.component';
import { DragScrollModule } from 'ngx-drag-scroll';
import { RecipeSummaryComponent } from './recipe-summary/recipe-summary.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomepageComponent,
    LeftPanelComponent,
    MainPanelComponent,
    MainCardComponent,
    SecondaryCardListComponent,
    SecondaryCardComponent,
    RecipeSummaryComponent
  ],
  imports: [
    CommonModule,
    DragScrollModule,
    NgxStarRatingModule,
    FormsModule

  ],
  exports: [
    HomepageComponent
  ]
})
export class HomepageModule { }
