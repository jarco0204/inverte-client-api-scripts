import express from 'express';
import {
    addIngredient,
    deleteIngredient,
    saveReadingToDB,
} from '../Controllers/Ingredient.js';

const ingredientRouter = express.Router(); // Handles all routes starting with /ingredient

// // REQUESTS to /ingredient/

// POST the tracked ingredientID to the list of tracked ingredients
// DELETE the tracked ingredientID
// 🦾 Note that you will need the UserID
ingredientRouter.route('/').post(addIngredient).delete(deleteIngredient);

//POST the JSON object of artificial dataset
ingredientRouter.route('/real-time').post(saveReadingToDB);

export default ingredientRouter;
