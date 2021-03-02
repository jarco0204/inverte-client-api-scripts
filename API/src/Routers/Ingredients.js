import express from 'express';
import { getAllIngredientsIDs } from '../Controllers/Ingredients.js';
/**
 * This router handles the one GET request to /ingredients/
 *
 */
const ingredientsRouter = express.Router(); // Handles all routes starting with /ingredients

ingredientsRouter.route('/').get(getAllIngredientsIDs);

export default ingredientsRouter;
