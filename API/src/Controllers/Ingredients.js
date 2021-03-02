import { Ingredient } from '../Models/Ingredient.js';
/**
 * Get all the tracked ingredients id
 * @param {*} req.body.userid & req.db
 * @param {*} res.send()
 */
export const getAllIngredients = (req, res) => {
    // DESIGN CHOICE: the db collection will be its own userid
    let collectionName = req.body.userId;
    //Static method to add ingredients id
    Ingredient.getAllIngredientsID(req.db, collectionName)
        .then((result) => {
            res.status(202).send({
                obj: result,
                message: 'Ingredient IDs Successfully retrieved',
            });
        })
        .catch((err) => {
            res.status(404).send({
                obj: err,
                message: 'Failed to retrieve ingredient ids',
            });
        });
};
