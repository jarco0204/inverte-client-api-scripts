import express from 'express';
import { saveReadingToDB } from '../Controllers/Ingredient.js';

const ingredientRouter = express.Router(); // Handles all routes starting with /ingredient

//POST the JSON object of artificial dataset
ingredientRouter.route('/real-time').post(saveReadingToDB);

export default ingredientRouter;
