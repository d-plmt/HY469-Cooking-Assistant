import { HtmlParser } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreppingModule } from './pages/prepping/prepping.module';
import { HomepageModule } from './pages/homepage/homepage.module';
import { BacksplashModule } from './pages/backsplash/backsplash.module';
import { CookingModule } from './pages/cooking/cooking.module';

const routes: Routes = [
  {path: 'homepage', pathMatch: 'full', loadChildren: () => HomepageModule},
  {path: '', redirectTo: 'homepage', pathMatch: 'full'},
  {path: 'prepping', pathMatch: 'full', loadChildren: () => PreppingModule},
  {path: 'cooking', pathMatch: 'full', loadChildren: () => CookingModule},
  {path: 'backsplash', pathMatch: 'full', loadChildren: () => BacksplashModule}

  // {path: 'recipe/:recipeName'}
  // { path: 'home2', pathMatch: 'full', loadChildren: () => import('./components/homepage/homepage.module').then(m => m.HomepageModule)},
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: 'recipe/:recipeName', component: RecipeSummaryComponent},
  // { path: 'prepingPage/:recipeName', component: PrepingPageComponent },
  // { path: 'backsplash', pathMatch: 'full', loadChildren: () => import('./components/preping-page/bs-preping/bs-preping.module').then(m => m.BsPrepingPageModule)},
  // { path: 'cookingPage/:recipeName', loadChildren: () => import('./components/cooking-page/cooking-page.module').then(m => m.CookingPageModule) },
  // { path: 'cookingBacksplash', loadChildren: () => import('./components/backsplash-cooking-page/backsplash-cooking-page.module').then(m => m.BacksplashCookingPageModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
