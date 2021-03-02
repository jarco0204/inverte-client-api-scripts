import express from 'express';
import { getAllIngredients } from '../Controllers/Ingredients.js';
/**
 * This router handles the one GET request to /ingredients/
 *
 */
const ingredientsRouter = express.Router(); // Handles all routes starting with /ingredients

ingredientsRouter.route('/').get(getAllIngredients);

export default ingredientsRouter;
