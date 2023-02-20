import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BacksplashComponent } from './backsplash.component';

const routes: Routes = [
  { path: '', component: BacksplashComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BacksplashRoutingModule { }
