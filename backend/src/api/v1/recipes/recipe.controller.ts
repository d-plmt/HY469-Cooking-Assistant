import { Request, Response, NextFunction, Router } from 'express';
import { Recipe, RecipeModel } from './recipe.model';
import { ResourceController } from '../../shared';
import { StatusCodes } from 'http-status-codes';
import { Logger } from '../../shared/utils/logger';

export class RecipeController extends ResourceController<Recipe>{

    private logger: Logger = new Logger();
    constructor() {
        super(RecipeModel);
    }
    private baseURL: string = "localhost:8080/api/recipes";
    /**
     * Apply all routes for example
     *
     * @returns {Router}
     */
    public applyRoutes(): Router {
        const router = Router();
        router
            .get('/', this.getRecipes)
            .get('/initialize', this.initializeRecipes)
            .get('/:id', this.getRecipeById)    
            .post('/', this.postRecipe)         //kapoia mallon de xreiazontai
            .put('/:id', this.updateRecipe)
            .delete('/:id', this.deleteRecipe)
            .get('/image/name', this.getImageByName);

        return router;
    }

    /**
     * Sends a message containing all tasks back as a response
     * @param req
     * @param res 
     */
    getRecipes = async (req: Request, res: Response) => {
        this.logger.debug('getRecipes request');
        const allTasks = await this.getAll(req, res);
        return res
            .status(StatusCodes.OK)
            .json(allTasks);
    }

    /**
     * Creates a new task
     * @param req
     * @param res
     */

    postRecipe = async (req: Request, res: Response) => {
        this.logger.debug('postRecipe request');
        const task = await this.create(req, res);
        return res
            .status(StatusCodes.OK)
            .json(task);
    }

    /**
     * Delete task by id
     * @param req 
     * @param res 
     */
    deleteRecipe = async (req: Request, res: Response) => {
        this.logger.debug('deleteRecipe request');
        const task = await this.delete(req.params.id, req, res);
        return res
            .status(StatusCodes.OK)
            .json(task);

    }

    /**
     * Update task by id
     * @param req 
     * @param res 
     */
    updateRecipe = async (req: Request, res: Response) => {
        this.logger.debug('updateRecipe request');
        const task = await this.update(req.params.id, req.body.blacklist, req, res);
        return res
            .status(StatusCodes.OK)
            .json(task);
    }

    /**
     * Get single task by id
     * @param req 
     * @param res 
     */
    getRecipeById = async (req: Request, res: Response) => {
        this.logger.debug('getRecipeById request');
        const item = await this.getOne(req.params.id, req, res);
        return res
            .status(StatusCodes.OK)
            .json(item);
    }

    /**
     * Get By Name
     * @param req 
     * @param res 
     */
    // Testing
    getRecipeByName = async (req: Request, res: Response) => {
        this.logger.debug('getRecipeByName request');
        // const item = await this.getOne(req.params.value, req, res);
        const item = await this.getOne(req.params.name, req, res);
        return res
            .status(StatusCodes.OK).json(item);
    }


    getImageByName = async (req: Request, res: Response) => {
        this.logger.debug('getImageByName request');
        const item = await this.getOne(req.params.name, req, res)
    }

    /**
     * Initialize items
     * @param req 
     * @param res 
     */
    initializeRecipes = async (req: Request, res: Response) => {
        this.logger.debug('initialize recipes request');
        const fs = require("fs");
        let recipes: any[] = [
            {
                name: "Avocado Toast",
                description: "Quick and easy Avocado Toast with Egg. It's a simple healthy protein-packed breakfast, snack or light meal! Simple to make, tasty and satisfying. If you haven't had an egg and avocado toast breakfast yet, now is the time!",
                image: "../../../../assets/recipes/avocado-toast.jpg",
                difficulty: 1,
                rating: 5,
                occasion: ["Breakfast", "Snack"],
                tags: ["Low Calories", "Quick & Easy"],
                steps: [{step: "Toast the bread in a toaster until golden and crispy"}, 
                {step: "In a small bowl, smash the avocado until smooth."}, {step: "Heat butter in nonstick skillet over medium-high heat until hot"}, {step: "Break the egg onto the skillet and immediately reduce the heat to low."}, {step: "Cook uncovered until whites are completely set and yolks are thickened to your liking, about 5-7 minutes.", timer: 5}, {step: "place the quarter avocado over the toast"}, {step: "Top with the egg, and season with salt and pepper, to taste."}],
                tips: [{title: "Storage", content: "To store the unused avocado, place in an airtight container or plastic bag for up to 24 hours"},
                        {title: "Serving Size", content: "1 egg, ¼ avocado and 1 slice of bread."}],
                ingredients: [{amount: "¼", ingredient: "avocado"}, {amount: "1 slice", ingredient: "whole grain bread"}, {ingredient: "Sea salt"}, 
                        {ingredient: "Black pepper"}, {amount: "½ tbsp", ingredient: "butter"}, {amount: "1", ingredient: "egg"}],
                nutrition: {serving: "1 open sandwich", calories: 197, protein: 7, carbs: 5, sugar: 2, fiber: 1, fat: 17, saturated: 6, trans: 0, cholesterol: 179},
                favorite: true
            },

            {
                name: "Breakfast Burritos",
                description: "These Easy Breakfast Burritos are just what you need for busy mornings. They're loaded with all the classic breakfast flavors your family loves in one convenient egg burrito.",
                image: "../../../../assets/recipes/Breakfast-Burritos.webp",
                difficulty: 2,
                rating: 4,
                occasion: ["Breakfast"],
                tags: ["High Protein"],
                steps: [{step: "Halve and pit the avocado, then cut a grid in the flesh. Use a spoon to scoop out the diced pieces."}, 
                {step: "Add all of the remaining salsa ingredients to the bowl."}, {step: "Mix to combine and set aside.", image: "../../../../assets/recipes/Breakfast-Burritos-6.webp"}, {step: "Heat a large nonstick pan over medium-high heat, and add the sausage. Cook, stirring frequently, until browned, 4 to 5 minutes.", timer: 4},{step: "Next, crack the eggs in a bowl and add the salt. Whisk to combine and set aside."}, {step: "Use a slotted spoon to transfer the sausage from the pan to a plate"}, {step: "Reduce the heat to low and add the eggs."}, {step: "Scramble until just cooked through, then transfer the eggs to a plate."}, {step: "Assemble the burritos: Spoon about 1/4 cup of the avocado-salsa on each tortilla.", image: "../../../../assets/recipes/Breakfast-Burritos-11.webp"}, {step: "Top with a quarter of the sausage and a quarter of the eggs. Finally, top with 1/3 cup cheese."}, {step: "Fold in the sides of the tortilla over the filling and roll, tucking in the edges as you go.", image: "../../../../assets/recipes/Breakfast-Burritos-14.webp"}, {step: "Serve warm and enjoy!", image: "../../../../assets/recipes/Breakfast Burritos.webp"}],
                tips: [{title: "Serving Size", content: "1 burrito"}],
                ingredients: [{amount: "1", ingredient: "avocado"}, {amount: "½ cup", ingredient: "tomatoes"}, {amount: "1", ingredient: "shallot", alternative: "onion"}, {amount: "1 clove", ingredient: "garlic"}, {amount: "1", ingredient: "jalapeño pepper", alternative: "bell pepper"}, {amount: "1 tbsp", ingredient: "lime juice", alternative: "lemon juice"}, {ingredient: "salt"}, {ingredient: "ground cumin"}, {amount: "4", ingredient: "eggs, large"}, {amount: "200g", ingredient: "spicy sausage", alternative: "chicken breast"}, {amount: "1 cup", ingredient: "mozzarella cheese", alternative: "cheddar cheese"}, {amount: "4", ingredient: "tortillas", alternative: "pita bread"}],
                nutrition: {serving: "1 burrito", calories: 636, protein: 30, carbs: 33, sugar: 4, fiber: 5, fat: 44, saturated: 15, 
                trans: 0, cholesterol: 259},
                favorite: true
            },

            {
                name: "Banana Pancakes",
                description: "Make these foolproof vegan banana pancakes. A guaranteed crowd pleaser with a fluffy, light texture, you'd never know they’re dairy and egg-free",
                image: "../../../../assets/recipes/banana_pancakes.webp",
                difficulty: 1,
                rating: 4.6,
                occasion: ["Breakfast", "Dessert"],
                tags: ["Vegan", "Low Calories"],
                steps: [{step: "Mash the banana in a mixing bowl. Stir in the sugar, salt and oil."}, {step: "Add the flour and baking powder and mix thoroughly."}, {step: "Make a well in the centre and gradually whisk in the milk. The batter should be a thick, droppable consistency."}, {step: "Heat a little oil in a frying pan over a medium heat."}, {step: "Add 2 tbsp of the batter to make American-style pancakes."}, {step: "Fry on each side for 2-3 mins until golden.", timer: 2}, {step: "Serve with maple syrup and chopped banana."}],
                tips: [{title: "Bananas", content: "Pick overripe bananas for a better, sweeter pancake"}],
                ingredients: [{amount: "1", ingredient: "banana"}, {amount: "2 tbsp", ingredient: "sugar", alternative: "stevia"}, {ingredient: "salt"}, {amount: "2 tbsp", ingredient: "sunflower oil", alternative: "coconut oil"}, {amount: "½ tsp", ingredient: "baking powder"}, {amount: "150 ml", ingredient: "soy milk", alternative: "almond milk"}, {ingredient: "maple syrup"}],
                nutrition: {serving: "4 pancakes", calories: 94, protein: 1, carbs: 14, sugar: 6, fiber: 1, fat: 4, saturated: 0, trans: 0, cholesterol: 0},
                favorite: false
            },

            {
                name: "Smoothie Bowl",
                description: "This makes the perfect breakfast or snack when you're in a rush but need something substantial (and want something pretty). It's especially great for the summer months when we're all looking for another way to cool down and keep time in the kitchen to a minimum.",
                image: "../../../../assets/recipes/smoothie_bowl.jpg",
                difficulty: 1,
                rating: 5,
                occasion: ["Breakfast", "Snack"],
                tags: ["Vegan", "Quick & Easy", "Low Calories"],
                steps: [{step: "Add frozen berries and banana to a blender and blend on low until small bits remain", image: "../../../../assets/recipes/Smoothie Bowl 1.jpg"}, {step: "Add the milk and blend on low again, scraping down sides as needed, until the mixture reaches a soft serve consistency."}, {step: "Scoop into a bowl  and top with the toppings."}],
                tips: [{title: "Freezing", content: "Leftovers can be kept in the freezer for 1-2 weeks"}],
                ingredients: [{amount: "1 cup", ingredient: "frozen berries"}, {amount: "1", ingredient: "banana", alternative: "mango"}, {amount: "3 tbsp", ingredient: "soy milk", alternative: "almond milk"}, {amount: "1 tbsp", ingredient: "shredded coconut"}, {amount: "1 tbsp", ingredient: "chia seeds", alternative: "pumpkin seeds"}, {amount: "1 tbsp", ingredient: "hemp seeds", alternative: "sunflower seeds"}],
                nutrition: {serving: "1 bowl", calories: 215, protein: 3, carbs: 47, sugar: 26, fiber: 9, fat: 3, saturated: 2, trans: 0, cholesterol: 0},
                favorite: false
            },

            {
                name: "Scrambled Eggs",
                description: "With this 5-ingredient recipe, scrambled eggs come out soft, creamy, and flavorful every time. An easy, delicious breakfast.",
                image: "../../../../assets/recipes/scrambled_eggs.jpg",
                difficulty: 2,
                rating: 4,
                occasion: ["Breakfast"],
                tags: ["Quick & Easy", "High Protein", "Low Calories"],
                steps: [{step: "Brush a small nonstick skillet with olive oil. Bring to medium heat."}, {step: "Crack the eggs into a medium bowl and add the milk. Whisk until smooth and combined, with no streaks of egg white remaining."}, {step: "Pour the eggs on the pan and pull a rubber spatula across the bottom of the pan to form large, soft curds of scrambled eggs."}, {step: "Continue cooking over medium-low heat, folding and stirring the eggs every few seconds."}, {step: "Remove the pan from the heat when the eggs are mostly set, but a little liquid egg remains."}, {step: "Season to taste with salt and pepper and garnish with chopped fresh chives."}],
                ingredients: [{amount: "3", ingredient: "eggs"}, {amount: "1 tsp", ingredient: "milk", alternative: "water"}, {ingredient: "olive oil", alternative: "butter"}, {ingredient: "salt"}, {ingredient: "black pepper", alternative: "hot sauce"}, {ingredient: "chives, chopped", alternative: "spring onion"}],
                nutrition: {serving: "3 eggs", calories: 225, protein: 22, carbs: 0, sugar: 0, fiber: 0, fat: 6, saturated: 5, trans: 0, cholesterol: 550},
                favorite: false
            },

            {
                name: "Yoghurt Parfait",
                description: "This yogurt parfait recipe makes a delicious breakfast, snack, or dessert! It looks great in a glass, but can also be made in a bowl. Use your favorite fruit, or whatever is in season.",
                image: "../../../../assets/recipes/yoghurt_parfait.jpg",
                difficulty: 1,
                rating: 4.5,
                occasion: ["Breakfast", "Snack", "Dessert"],
                tags: ["Quick & Easy", "High Protein", "Low Calories"],
                steps: [{step: "Add honey to the container of yogurt. Stir well."}, {step: "In a mason jar, layer yogurt and berries. Top with granola."}],
                ingredients: [{amount: "900g", ingredient: "greek yoghurt"}, {amount: "3 tbsp", ingredient: "honey", alternative: "maple syrup"}, {amount: "500g", ingredient: "frozen berries", alternative: "peaches"}, {amount: "1.5 cups", ingredient: "granola"}],
                nutrition: {serving: "1 jar", calories: 232, protein: 8, carbs: 28, sugar: 16, fiber: 4, fat: 10, saturated: 0, trans: 0, cholesterol: 0},
                favorite: true
            },

            {
                name: "Croque Monsieur",
                description: "Croque Monsieur is a delicious French ham and cheese sandwich made with gruyere, parmesan, ham and a simple béchamel sauce, toasted in the oven.",
                image: "../../../../assets/recipes/croque_monsieur.jpg",
                difficulty: 4,
                rating: 5,
                occasion: ["Breakfast", "Lunch"],
                tags: ["High Protein"],
                steps: [{step: "Preheat oven to 200°C. Line a baking tray with parchement paper and set aside."}, {step: "Melt butter in a medium saucepan over medium heat.", video: "./videos/croque_monsieur.mp4"}, {step: "Whisk in flour and cook, stirring constantly, for about 3 minutes.", timer: 3}, {step: "Gradually add milk, stirring well until the mixture is smooth."}, {step: "Cook, stirring, until sauce is thickened.", video: "end"}, {step: "Season with a little bit of salt and pepper. Remove from heat and whisk in mustard and nutmeg."}, {step: "Spread each bread slice with a layer of béchamel, spreading it all the way to the edges."}, {step: "Place 4 slices of bread, béchamel side up, on prepared baking sheet."}, {step: "Top each with a piece of ham, a handful of gruyere, and a sprinkle of parmesan cheese."}, {step: "Place remaining slices of bread on top, béchamel side up, then top with remaining gruyere and parmesan cheese.", image: "../../../../assets/recipes/croque_monsieur_1.jpg"}, {step: "Bake at 220 degrees for about 5-6 minutes, until cheese is melted", timer: 5}, {step: "Turn the oven to broil and broil until the cheese on top is lightly golden, 2-4 minutes.", timer: 2, image: "../../../../assets/recipes/croque_monsieur_2.jpg"}],
                tips: [{title: "Storing", content: "To store the bechamel sauce, place plastic wrap on top of it and then cover and refrigerate it for up to 1 week"}, {title: "Croque Madame", content: "To turn this into a Croque Madame, place a fried egg on top of the finished sandwich"}],
                ingredients: [{amount: "¼ cup", ingredient: "butter"}, {amount: "¼ cup", ingredient: "flour"}, {amount: "1.5 cups", ingredient: "milk"}, {ingredient: "salt"}, {ingredient: "black pepper"}, {amount: "¼ tsp", ingredient: "dijon mustard", alternative: "mustard seeds"}, {amount: "8 slices", ingredient: "white bread", alternative: "whole wheat bread"}, {amount: "8 slices", ingredient: "ham", alternative: "turkey"}, {amount: "180g", ingredient: "Emmental cheese, grated", alternative: "Cheddar cheese"}, {amount: "¼ cup", ingredient: "Parmesan cheese, grated", alternative: "Pecorino Romano"}],
                nutrition: {serving: "1 sandwich", calories: 658, protein: 25, carbs: 13, sugar: 5, fiber: 2, fat: 34, saturated: 19, trans: 0, cholesterol: 104},
                favorite: true
            },

            {
                name: "Buddha Bowl",
                description: "These Greek Buddha Bowls are a Greek-inspired recipe made vegetarian. Each bowl is packed with over 20 grams of protein and 13 grams of fibre, so you won't be left feeling hungry!",
                image: "../../../../assets/recipes/buddha-bowl.jpg",
                difficulty: 2,
                rating: 3,
                occasion: ["Lunch", "Dinner"],
                tags: ["High Protein", "Quick & Easy"],
                steps: [{step: "Place 2 cups water in a saucepan and bring to boil"}, {step: "Add the farro to the boiling water and season with salt. Cook for 10-12 minutes", timer: 10}, {step: "Mix the olive oil, vinegar, garlic, herbs and seasoning together in a bowl."}, {step: "Add the chickpeas to the bowl and mix everything."}, {step: "Layer some farro on the bottom of the bowls"}, {step: "Top with the marinated chickpeas, vegetables and feta"}, {step: "Cut a lemon wedge and place it on top of the bowl"}],
                tips: [{title: "Chickpeas", content: "The longer the chickpeas sit in the marinade, the better."}, {title: "Farro", content: "Cook the farro in vegetable stock for more flavor"}],
                ingredients: [{amount: "1 can", ingredient: "chickpeas, drained", alternative: "kidney beans"}, {amount: "3 tbsp", ingredient: "olive oil"}, {amount: "1 tbsp", ingredient: "vinegar", alternative: "lemon juice"}, {amount: "1 tsp", ingredient: "garlic, minced"}, {amount: "2 tbsp", ingredient: "parsley", alternative: "cilantro, chopped"}, {amount: "¼ tsp", ingredient: "salt"}, {amount: "¼ tsp", ingredient: "black pepper"}, {amount: "1 cup", ingredient: "farro", alternative: "brown rice"}, {amount: "1 cup", ingredient: "cherry tomatoes", alternative: "tomatoes"}, {amount: "1 cup", ingredient: "cucumber"}, {amount: "¼ cup", ingredient: "olives"}, {amount: "¼ cup", ingredient: "feta cheese"}],
                nutrition: {serving: "1 bowl", calories: 600, protein: 21.5, carbs: 63, sugar: 4.1, fiber: 13.6, fat: 26, saturated: 5, trans: 0, cholesterol: 0},
                favorite: false
            },

            {
                name: "Classic Burger",
                description: "The classic burger is an all time BBQ favourite! This super easy burger recipe gives you delicious patties, packed with onions and herbs for extra flavour, that are perfect for topping with cheese, lettuce and tomato.",
                image: "../../../../assets/recipes/classic-burger.jpg",
                difficulty: 3,
                rating: 4.7,
                occasion: ["Lunch", "Dinner"],
                tags: ["High Protein"],
                steps: [{step: "Heat the olive oil in a frying pan, add the onion and cook for 5 minutes until softened and starting to turn golden.", timer: 5}, {step: "In a bowl, combine the beef mince with the herbs and the egg."}, {step: "Season, add the onions and mix well. Using your hands, shape into 4 patties."}, {step: "Cook the burgers on a preheated barbecue or griddle for 5-6 minutes on each side.", timer: 5}, {step: "While the second side is cooking, lay a slice of cheese on top to melt slightly", timer: 5}, {step: "Lightly toast the cut-sides of the buns on the barbecue."}, {step: "Fill with the lettuce, burgers and tomato slices. Serve with ketchup."}],
                ingredients: [{amount: "½ tbsp", ingredient: "olive oil", alternative: "sunflower oil"}, {amount: "1 large", ingredient: "onion, chopped", alternative: "shallot"}, {amount: "500g", ingredient: "minced beef", alternative: "minced pork"}, {amount: "1 tsp", ingredient: "mixed dried herbs"}, {amount: "1 medium", ingredient: "egg"}, {amount: "4 slices", ingredient: "Cheddar cheese", alternative: "Mozzarella cheese"}, {amount: "4 medium", ingredient: "burger buns, toasted"}, {amount: "3-4", ingredient: "lettuce leaves"}, {amount: "1 large", ingredient: "tomato"}],
                nutrition: {serving: "1 burger", calories: 472, protein: 31.8, carbs: 29, sugar: 4, fiber: 2.2, fat: 26, saturated: 10, trans: 0, cholesterol: 188},
                favorite: true
            },

            {
                name: "Pasta Carbonara",
                description: "Spaghetti alla carbonara. Luscious and wonderfully indulgent, pasta carbonara takes as long to make as it does to cook the pasta.",
                image: "../../../../assets/recipes/Carbonara.webp",
                difficulty: 4,
                rating: 5,
                occasion: ["Lunch", "Dinner"],
                tags: ["High Protein"],
                steps: [{step: "Put a large pot of salted water on to boil."}, {step: "While the water is coming to a boil, heat the olive oil or butter in a large sauté pan over medium heat."}, {step: "Add the guanciale and cook slowly until crispy.", timer: 10}, {step: "Turn off the heat and put the guanciale into a large bowl."}, {step: "In a small bowl, beat the eggs and mix in about half of the cheese."}, {step: "Once the water has reached a rolling boil, add the dry pasta, and cook, uncovered, at a rolling boil.", timer: 7}, {step: "When the pasta is al dente (still a little firm, not mushy), use tongs to move it to the bowl with the guanciale. Reserve some of the pasta water."}, {step: "Toss everything to combine, allowing the pasta to cool just a bit."}, {step: "Add the beaten eggs with cheese and toss quickly to combine once more."}, {step: "Add salt to taste and some pasta water back to the pasta to keep it from drying out."}, {step: "Serve at once with the rest of the pecorino and freshly ground black pepper."}],
                ingredients: [{amount: "1 tbsp", ingredient: "olive oil", alternative: "butter"}, {amount: "300g", ingredient: "guanciale", alternative: "pancetta"}, {amount: "3-4", ingredient: "eggs"}, {amount: "1 cup", ingredient: "Pecorino Romano, grated"}, {amount: "500g", ingredient: "spaghetti"}, {amount: "To taste", ingredient: "salt"}, {amount: "To taste", ingredient: "black pepper"}],
                nutrition: {serving: "1 serving (makes 4-6)", calories: 447, protein: 16, carbs: 25, sugar: 1, fiber: 1, fat: 31, saturated: 11, trans: 0, cholesterol: 166},
                favorite: false
            },

            {
                name: "Fried Rice",
                description: "This chicken fried rice will easily become one of your go-to dinners! It's easy, it calls for basic ingredients, it's hearty and filling and it's perfectly flavorful.",
                image: "../../../../assets/recipes/fried-rice.jpg",
                difficulty: 2,
                rating: 4.1,
                occasion: ["Lunch", "Dinner"],
                tags: ["High Protein", "Quick & Easy"],
                steps: [{step: "In a large non-stick wok or skillet, heat 1 1/2 tsp sesame oil and 1 1/2 tsp of the canola oil over medium-high heat."}, {step: "Once hot, add chicken pieces, season lightly with salt and pepper and saute until cooked through, about 5 - 6 minutes.", timer: 5}, {step: "Transfer chicken to a plate and set aside."}, {step: "Return skillet to medium-high heat, add remaining 1 1/2 tsp sesame oil and 1 1/2 tsp canola oil."}, {step: "Add peas and carrots blend and green onions and saute 1 minute", timer: 1}, {step: "Add garlic and saute 1 minute longer.", timer: 1}, {step: "Push veggies to edges of pan, add eggs in center and cook and scramble.", timer: 3}, {step: "Return chicken to skillet along with rice."}, {step: "Add in soy sauce and season with salt and pepper to taste."}, {step: "Top with Sriracha and serve warm."}],
                ingredients: [{amount: "3 cups", ingredient: "white rice, cooked"}, {amount: "350g", ingredient: "chicken breast, in cubes", alternative: "chicken thigh"}, {amount: "1 tbsp", ingredient: "sesame oil"}, {amount: "1 tbsp", ingredient: "canola oil", alternative: "peanut oil"}, {amount: "1.5 cup", ingredient: "peas and carrots"}, {amount: "3 whole", ingredient: "spring onions"}, {amount: "2 cloves", ingredient: "garlic, minced"}, {amount: "2 large", ingredient: "eggs"}, {amount: "2 tbsp", ingredient: "soy sauce"}],
                nutrition: {serving: "1 serving (makes 3)", calories: 518, protein: 36, carbs: 54, sugar: 1, fiber: 6, fat: 17, saturated: 2, trans: 0, cholesterol: 181},
                favorite: true
            },
            {
                name:"Roast Chicken",
                description:"Nothing beats an easy to make and even easier to prepare roast chicken.This Roast Chicken definitely beats the pants off of any rotisserie chicken!",
                image:"../../../../assets/recipes/Roast Chicken.jpg",
                difficulty: 2,
                rating: 4.8,
                occasion:["Lunch","Dinner"],
                tags:["High Protein"],
                steps:[{step:"Preheat the oven to 210°c/Gas mark 7. Remove the chicken giblets. Rinse the chicken inside and out. Remove any excess fat and leftover pin feathers and pat the outside dry."},{step:"Liberally salt and pepper the inside of the chicken. Stuff the cavity with the bunch of thyme, both halves of lemon, and all the garlic. Brush the outside of the chicken with the butter and sprinkle again with salt and pepper."},{step:" Tie the legs together with kitchen string and tuck the wing tips under the body of the chicken. Place the onions, carrots, and fennel in a roasting pan. Toss with salt, pepper, 20 sprigs of thyme, and olive oil. Spread around the bottom of the roasting pan and place the chicken on top."},{step:"Roast the chicken for 1 1/2 hours, or until the juices run clear when you cut between a leg and thigh.",timer:120},{step:"Remove the chicken and vegetables to a platter and cover with aluminium foil for about 20 minutes. Slice the chicken onto a platter and serve it with the vegetables.",timer:20}],
                ingredients:[{amount:"1 (~2.5kg)",ingredient:"whole chicken"},{ingredient:"salt"},{ingredient:"Black Pepper"},{amount:"1 large bunch",ingredient:"fresh thyme"},{amount:"1 whole",ingredient:"lemon"},{amount:"1 head",ingredient:"garlic"},{amount:"30g",ingredient:"butter, melted"},{amount:"1 large",ingredient:"onion, chopped"},{amount:"4",ingredient:"carrots, chopped"},{amount:"1 bulb",ingredient:"fennel"},{ingredient:"olive oil",alternative:"avocado oil"}],
                nutrition:{serving:"1 serving (makes 8)",calories:122, protein:24, carbs:0, sugar:0, fiber:2, fat:12, saturated:1, trans:0, cholesterol:84},
                favorite:false
            },

            {
                name:"Fish & Chips",
                description:"Classic fish and chips are a British institution and a national dish that everyone can't help but love.",
                image:"../../../../assets/recipes/Fish & Chips.jpg",
                difficulty:2,
                rating:4.4,
                occasion:["Lunch", "Dinner"],
                tags:["Vegan", "Quick & Easy"],
                steps:[{step:"Place a deep pan with sunflower oil over medium to high heat and let the oil heat to 180* C (350* F)."},{step:"In a bowl, combine the flour, baking powder, sugar and salt."},{step:"Add the bear and whisk for 1-2 minutes, until all of the ingredients are completely combined and there are no lumps."},{step:"Place the codfish on a clean working surface and season with salt and pepper. (If the fish is salted just add pepper)"},{step:"In a bowl, add the flour for the breading."},{step:"Sprinkle the fish with flour and then dip it into the batter."},{step:"Fry for about 4-5 minutes until golden on both sides.",timer:4},{step:"When ready, remove from pan and allow to drain on paper towels."},{step:"Serve with fries, tartar sauce, garlic dip with bread and lemon wedges."}],
                ingredients:[{amount:"1 1/2 kilo",ingredient:"boneless cod"},{ingredient:"pepper"},{amount:"500g",ingredient:"all purpose flour"},{ingredient:"seed oil",alternative:"olive oil"},{amount:"1 tbsp",ingredient:"baking powder"},{amount:"1 pinch",ingredient:"granulated sugar"},{amount:"1 pinch",ingredient:"salt"},{amount:"500g",ingredient:"beer"}],
                nutrition:{serving:"1 serving (makes 4-6)",calories:578,protein:52,carbs:62,sugar:1,fiber:3, fat: 5,saturated:2,trans:1,cholesterol:148},
                favorite:true

            },

            {
                name:"Marble loaf cake",
                description:"Who says birthday and special-occasion cakes only have to be round and frosted with icing? This loaf cake is just as party-worthy as any.",
                image:"../../../../assets/recipes/Marble Loaf Cake.jpg",
                difficulty:1,
                rating:4.5,
                occasion:["Dessert"],
                tags:["Quick & Easy","Low Calories"],
                steps:[{step:"Preheat the oven to 170°C (340° F) set to fan."},{step:"Grease and flour a 10x30 cm loaf tin and set it aside."},{step:"In a bowl add the eggs, seed oil, sugar, and milk, and whisk them well."},{step:"Add the flour, vanilla powder, salt, and baking powder, and whisk until the ingredients are homogenized."},{step:"Transfer half of the cake batter to the loaf tin and set it aside."},{step:"Add the cocoa powder and the chocolate into the other half of the cake batter that is in the bowl, whisk well, and transfer it to the center of the loaf tin."},{step:"Use a wooden skewer to swirl the batter and give a nice shape to the cake. Then, score the center of the cake gently with a fork to help it rise evenly during baking."},{step:"Transfer the loaf tin to the oven and bake the cake for 35-40 minutes.",timer:35},{step:"Remove the loaf tin from the oven and set it aside to cool."},{step:"Take the cake out of the loaf tin, cut it into pieces, and serve."}],
                ingredients:[{amount:"3",ingredient:"eggs"},{amount:"150g",ingredient:"sunflower oil",alternative:"olive oil"},{amount:"180g",ingredient:"milk",alternative:"almond milk"},{amount:"250g",ingredient:"all purpose flour"},{amount:"1 tsp",ingredient:"vanilla extract"},{amount:"1 pinch",ingredient:"salt"},{amount:"15g",ingredient:"baking powder"},{amount:"20g",ingredient:"cocoa powder"},{amount:"100g",ingredient:"dark chocolate, chopped"}],
                nutrition:{serving:"1 serving (makes 8-10)",calories:407,protein:7,carbs:45,sugar:24,fiber:2, fat: 10, saturated:5,trans:2,cholesterol:40},
                favorite:true

            },

            {
                name:"Apple Pie",
                description:"Serve hot or cold at family dinners or during the holidays, topped with whipped cream or ice cream, or alongside a slice of Cheddar cheese this apple pie is sure to be your favorite pie yet.",
                image:"../../../../assets/recipes/Apple Pie.jpg",
                difficulty:2,
                rating:4.4,
                occasion:["Dessert"],
                tags:["Vegan","Quick & Easy"],
                steps:[{step:"Preheat oven to 180* C (350* F) Fan."},{step:"To prepare the dough, add all of the ingredients in a mixers bowl. Beat with the hook attachment until a soft, elastic dough is created. You may need to add some extra flour so the dough won’t stick to the sides of the mixing bowl."},{step:"Remove dough from mixing bowl and cut in half."},{step:"Wrap one half in plastic wrap and put in freezer for 1 hour. Grease and flour a 26 cm round cake pan. Spread the other half onto the bottom and sides of the cake pan, with your hands, to create a pie shell.",timer:60},{step:"Place all of the ingredients for the filling (chopped apples, sugar substitute and cinnamon), in a nonstick pan. Cook until the apples soften. Spread filling over pie shell"},{step:"When the remaining dough is ready, cut into small cubes and spread nicely over the filling, creating a very impressive pie shell!"},{step:"Bake for 35-40 minutes, until golden",timer:35},{step:"Remove from oven. Set aside to cool for 5 minutes."},{step:"Serve with castor sugar."}],
                ingredients:[{amount:"240g",ingredient:"self-rising flour"},{amount:"240g",ingredient:"whole wheat flour"},{amount:"2 tbsps",ingredient:"baking powder"},{amount:"1 pinch",ingredient:"salt"},{amount:"200g",ingredient:"olive oil"},{amount:"65g",ingredient:"orange juice", alternative: "water"},{amount:"240g",ingredient:"water"},{amount:"8-10",ingredient:"apples, cut into cubes"},{amount:"2 tbsps",ingredient:"stevia"},{amount:"50g",ingredient:"walnuts, finely chopped"},{ingredient:"cinnamon"}],
                nutrition:{serving:"1 serving (makes 8-10)",calories:475,protein:7,carbs:54,sugar:18,fiber:5,fat: 15, saturated:4,trans:3,cholesterol:38},
                favorite:false


            },

            {
                name:"Feta and bacon stuffed baguette",
                description:"Simple and delicious.these stuffed baguettes will sure ease your appetite!",
                image:"../../../../assets/recipes/Feta and bacon stuffed baguette.jpg",
                difficulty:1,
                rating:4.9,
                occasion:["Snack"],
                tags:["Quick & Easy","High Protein","Low Calories"],
                steps:[{step:"Preheat the oven to 220ο C (430ο F) set to broiler."},{step:"In a mortar and pestle add the garlic, salt, pepper, olive oil, and parsley, and crush them well until homogenized. Set the mixture aside."},{step:"Cut the baguette into 8 equal pieces. Cut the ends a little to make the surface of the pieces even. Use your fingers to press the soft part of the baguette and make a large pocket. You should not pierce through the baguette."},{step:"Place the baguettes standing on a baking pan lined with parchment paper and use a pastry brush to spread the infused olive oil you prepared on the inside."},{step:"Cut the feta cheese into strips and make sure they have the same thickness and length in order to fit in the pocket you created. Wrap each feta strip with a slice of bacon and put them in each baguette piece."},{step:"Spread some mozzarella in each piece and bake them for 15 minutes.",timer:15},{step:"Serve with ketchup."}],
                ingredients:[{amount:"1 clove",ingredient:"garlic"},{ingredient:"salt"},{ingredient:"pepper"},{amount:"2 tbsps",ingredient:"olive oil"},{amount:"2 tbsps",ingredient:"parsley"},{amount:"200g",ingredient:"feta cheese"},{amount:"80g",ingredient:"bacon"},{amount:"50g",ingredient:"mozzarella cheese"},{amount:"250g",ingredient:"french baguette"},{ingredient:"ketchup"}],
                nutrition:{serving:"1 serving (makes 8)",calories:218,protein:10,carbs:16,sugar:1,fiber:1,fat: 20, saturated:6,trans:12,cholesterol:60},
                favorite:true

            }
        ]

        await RecipeModel.insertMany(recipes)
            .then(function (docs) {
                res.json(docs);
                console.log("inserted");
            })
            .catch(function (err) {
                res.status(500);
            });
        return res
            .status(StatusCodes.OK);
    }
}
