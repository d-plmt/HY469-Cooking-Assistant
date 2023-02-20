import { Injectable } from '@angular/core';
import { RecipeModel } from '../../models/recipes/recipe.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';
import { result } from 'lodash';
import { data } from 'jquery';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private hostURl: string;
  recipe = new BehaviorSubject(this.mainRecipe);

  constructor(private http: HttpClient, private socket: Socket) {
    this.hostURl = environment.host;
    // remove comment to delete all items
    // this.deleteAll();
  }

  public getAll(): Observable<RecipeModel[]> {
    return this.http
      .get<RecipeModel[]>(`${this.hostURl}/api/recipes/`)
      .pipe(map(result => _.map(result, (t) => new RecipeModel(t))));
  }
  public create(resource: RecipeModel): Observable<RecipeModel> {
    return this.http
      .post<RecipeModel>(`${this.hostURl}/api/recipes`, resource)
      .pipe(map(result => new RecipeModel(result)));
  }
  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.hostURl}/api/recipes/${id}`);
  }

  public initialize(resource: RecipeModel): Observable<RecipeModel> {
    return this.http
      .post<RecipeModel>(`${this.hostURl}/api/recipes/initialize`, resource)
      .pipe(map(result => new RecipeModel(result)));
  }

  set mainRecipe(json_recipe: any) {
    if (json_recipe === null) {
      localStorage.clear;
    }
    else {
      this.recipe.next(json_recipe);
      localStorage.clear;
      localStorage.setItem('json_recipe', json_recipe);
    }
  }

  get mainRecipe() {
    return localStorage.getItem('json_recipe');
  }

  public publish(event: string, data: any) {

    // Inform backend to broadcast socket event
    // Publish event needs to land on server and the server will publish it.
    this.socket.emit("client:event", { event: event, data: data });
  }
  public subscribe(event: string, callback: Function) {

    this.socket.on(event, (data: any) => {
      callback(data);
    })
  }


  // Debug function for deleting all items
  private deleteAll() {
    this.getAll().subscribe((data: RecipeModel[]) => {
      data.forEach((recipe: RecipeModel) => {
        this.delete((recipe as any)._id).subscribe((data: any) => { });
      });
    });
  }

  public getRecipeByName(recipeName: string | undefined): Observable<RecipeModel[]> {
    let recipeModel = new RecipeModel();

    // Example URL
    // http://localhost:8080/api/recipes?name=Classic%20Burger

    return this.http
      .get<RecipeModel>(`${this.hostURl}/api/recipes?name=` + recipeName)
      .pipe(map(result => _.map(result, (t) => new RecipeModel(t))));

      // .pipe(map(result => new RecipeModel(result)));

      // .get<RecipeModel>(`${this.hostURl}/api/recipes?name=` + recipeName).pipe(map(result => new RecipeModel(result)));



      // alert(recipe.);
      // return recipe;


    // let recipe = new Observable<RecipeModel>;
    // alert(`${this.hostURl}/api/recipes/` + recipeName);
    // return recipe;
  }

  getJsonRecipe(recipeName: string): any {

    let my_url = 'localhost:8080/api/recipes?name=' + recipeName.replace(/ /g, '%20');

    let result: string;

    fetch('http://localhost:8080/api/recipes?name=' + recipeName.replace(/ /g, '%20'))
    .then((response) => response.json())
    .then((data) =>{ console.log(data); /*alert(JSON.stringify(data));*/ result = JSON.stringify(data); return JSON.stringify(data)}).finally( () => { return result});

  }

}
