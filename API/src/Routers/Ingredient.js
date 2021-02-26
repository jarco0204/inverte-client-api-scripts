import express from 'express';
import { getTrackedIngredients } from '../Controllers/Ingredient.js';

const ingredientRouter = express.Router(); // Handles all routes starting with /ingredient

//GET all the tracked ingredients
// 🦾 Note that you will need the UserID
ingredientRouter.route('/').get(getTrackedIngredients);

export default ingredientRouter;
