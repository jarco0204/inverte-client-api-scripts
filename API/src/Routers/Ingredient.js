import express from 'express';
import {
    getTrackedIngredients,
    saveReadingToDB,
} from '../Controllers/Ingredient.js';

const ingredientRouter = express.Router(); // Handles all routes starting with /ingredient

//GET all the tracked ingredients
// 🦾 Note that you will need the UserID
ingredientRouter.route('/').get(getTrackedIngredients);

//POST the JSON object of artificial dataset
ingredientRouter.route('/real-time').post(saveReadingToDB);

export default ingredientRouter;
