import { Component, ViewChild} from '@angular/core';
import { RecipeModel } from './global/models/recipes/recipe.model';
import { PreppingModule } from './pages/prepping/prepping.module';
import { HomepageModule } from './pages/homepage/homepage.module';
import { ActivatedRoute, Router } from '@angular/router';
import { extendWith } from 'lodash';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { Location } from '@angular/common';
import { RecipesService } from './global/services/recipes/recipes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(HomepageComponent) homepage: { reset: () => void; } | undefined;

  title = 'frontend';
  currentModule!: string;
  recipe: RecipeModel | undefined;


  constructor(private router: Router, private location: Location, private recipesService: RecipesService) {}

  ngOnInit(): void {
    let loc = this.location.path();
    if (loc === '/') {
      this.currentModule = 'homepage';
      return;
    }
    this.currentModule = loc.substring(1);
    // if (loc === '/' || loc === '/homepage') {
    //   this.currentModule = 'homepage';
    // }
    // else if (loc === '/backsplash') {
    //   this.currentModule = 'backsplash';
    // }
    // else {
    //   this.currentModule
    // }
  }

  loadModule(moduleName: string, recipe?: RecipeModel) {
    console.log('moduleName: '+moduleName);
    this.currentModule = moduleName;
    this.recipesService.publish('mainModule', moduleName);
    if (moduleName === 'homepage') {
      this.router.navigate(['homepage']);
      if (this.homepage !== undefined) {
        this.homepage.reset();
      }
      return;
    }
    if (recipe !== undefined) {
      this.recipe = recipe;
    }

    this.router.navigate([`/${moduleName}`]);
  }
}
