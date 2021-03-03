import express from 'express';
import {
    addIngredientID,
    deleteIngredientID,
    addIngredientInfo,
    getIngredientInfo,
    updateIngredientPortion,
    updateIngredientName,
    saveReadingToDB,
} from '../Controllers/Ingredient.js';

const ingredientRouter = express.Router(); // Handles all routes starting with /ingredient

/**
 * REQUESTS to:  /ingredient/
 * POST the tracked ingredientID to the list of tracked ingredients ids
 * DELETE the tracked ingredientID
 * 🦾 Note that you will need the UserID and IngredientID
 */
ingredientRouter.route('/').post(addIngredientID).delete(deleteIngredientID);

/**
 * REQUESTS to: /ingredient/info
 * POST the info of a tracked ingredient
 * GET the info associated with a tracked ingredientID
 * 🦾 Note you will need the UserID and IngredientID
 */
ingredientRouter.route('/info').post(addIngredientInfo).get(getIngredientInfo);

/**
 * REQUESTS to /ingredient/info/portion
 * PUT the updated portion
 * 🦾 Note you will need the UserID, IngredientID, newPortionWeight
 */
ingredientRouter.route('/info/portion').put(updateIngredientPortion);

/**
 * REQUESTS to /ingredient/info/name
 * PUT the updated name
 * 🦾 Note you will need the UserID, IngredientID, newName
 */
ingredientRouter.route('/info/name').put(updateIngredientName);
//POST the JSON object of artificial dataset
ingredientRouter.route('/real-time').post(saveReadingToDB);

export default ingredientRouter;
