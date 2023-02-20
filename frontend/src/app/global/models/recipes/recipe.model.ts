export class RecipeModel {

  public name!: string;
  public description!: string;
  public image!: string;
  public difficulty!: number;
  public rating!: number;
  public occasion!: string[];
  public tags!: string[];
  public steps!: {step: string, image: string, timer ?: number, video ?: string}[];
  public tips!: {title: string, content: string}[];
  public ingredients!: {amount?: string, ingredient: string, alternative ?: string, ingrAvailable : boolean, altAvailable: boolean, location: string}[];
  public nutrition!: {serving: string, calories: number, protein: number, carbs: number,
    sugar: number, fiber: number, fat: number, saturated: number, trans: number, cholesterol: number
  };
  public favorite!: boolean;
  public allIngredientsAvailable!: boolean;

  constructor(model?: any) {
    Object.assign(this, model);
  }
}
