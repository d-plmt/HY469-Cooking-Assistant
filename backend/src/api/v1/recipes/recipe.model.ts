import { Document, Schema, Model, model } from 'mongoose';
import { DefaultSchemaOptions } from '../../../models/shared';


// ------------------------------------------
// Interface declaration
export interface Steps {
  
}


export interface Recipe extends Document {
  name: string;
  description: string;
  image: string;
  difficulty: number;
  rating: number;
  occasion: string[],
  tags: string[],
  steps: {
    step: string, 
    image ?: string, 
    timer ?: number, 
    video ?: string 
  }[],
  tips ?: {title?: string, content?: string}[],
  ingredients: {amount?: string, ingredient: string, alternatives ?: string}[]
  nutrition: {serving: string, calories: number, protein: number, carbs: number, 
    sugar: number, fiber: number, fat: number, saturated: number, trans: number, cholesterol: number},
  favorite: boolean
}

// ------------------------------------------
// Schema definition
const recipeSchema = new Schema(
  {
    name: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    difficulty: {type: Number, required: true},
    rating: {type: Number, required: true},
    occasion: [{type: String, required: true}],
    tags: [{type: String, required: true}],
    steps: [{type: Object, required: true},
      {step: String, required: true},
      {image: String},
      {timer: Number},
      {video: String}
    ],
    tips: [{type: Object},
      {title: String},
      {content: String}
    ],
    ingredients: [{type: Object},
      {amount: String},
      {ingredient: String, required: true},
      {alternative: String}
    ],
    nutrition: {
      serving: {type: String, required: true},
      calories: {type: Number, required: true},
      protein: {type: Number, required: true},
      carbs: {type: Number, required: true},
      sugar: {type: Number, required: true},
      fiber: {type: Number, required: true},
      fat: {type: Number, required: true},
      saturated: {type: Number, required: true},
      trans: {type: Number, required: true},
      cholesterol: {type: Number, required: true}
    },
    favorite: {type: Boolean, required: true}
  },
  { ...DefaultSchemaOptions }
);

// ------------------------------------------
// Schema model exports
export const RecipeModel: Model<Recipe> = model<Recipe>(
  'Recipe', recipeSchema, 'Recipe'
);
