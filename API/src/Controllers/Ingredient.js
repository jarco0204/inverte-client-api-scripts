import { Ingredient } from '../Models/Ingredient.js';

// // REQUESTS to /ingredient/
/**
 * Handles POST requests to /ingredient/
 *  Adds an ingredient id to the list of tracked ingredients of a user
 * @param {*} req
 * @param {*} res
 */
export const addIngredientID = (req, res) => {
    // DESIGN CHOICE: the db collection will be its own userid
    let collectionName = req.body.userId;

    //Static method to add ingredients id
    Ingredient.addIngredientID(req.db, collectionName, req.body.trackedIngID)
        .then((result) => {
            res.status(202).send({ obj: result, message: 'you got it' });
        })
        .catch((err) => {
            res.status(404).send({ obj: err, message: 'It failed to add ' });
        });
};

/**
 * Handles DELETE requests to /ingredient/
 * Delete a tracked ingredient from the list of tracked ingredients
 * @param {*} req.body.userid & req.body.trackedIngID & req.db
 * @param {*} res.send()
 */
export const deleteIngredientID = (req, res) => {
    // DESIGN CHOICE: the db collection will be its own userid
    let collectionName = req.body.userId;
    //Static method to add ingredients id
    Ingredient.deleteIngredientID(req.db, collectionName, req.body.trackedIngID)
        .then((result) => {
            res.status(202).send({
                obj: result,
                message: 'Ingredient Successfully deleted',
            });
        })
        .catch((err) => {
            res.status(404).send({
                obj: err,
                message: 'Failed to delete ingredient',
            });
        });
};
/**
 * Handles POST requests to /ingredient/info
 * This method can also update the tracked ingredient info.
 * Adds the info of a tracked ingredient to the database
 * @param {*} req.body.userID & req.body.ingredientData
 * @param {*} res
 */
export const addIngredientInfo = (req, res) => {
    // DESIGN CHOICE: the db collection will be its own userid
    let collectionName = req.body.userId;
    let ingredientID = req.body.trackedIngID;
    let ingredientData = req.body.ingredientData; // array containing [name,correctPortion]
    //Static method to add ingredient info
    Ingredient.addIngredientInfo(
        req.db,
        collectionName,
        ingredientID,
        ingredientData,
    )
        .then((result) => {
            res.status(202).send({
                obj: result,
                message: 'Ingredient Information Successfully added',
            });
        })
        .catch((err) => {
            res.status(404).send({
                obj: err,
                message: 'Failed to add ingredient info',
            });
        });
};
/**
 *
 * @param {*} req
 * @param {*} res
 */
export const getIngredientInfo = (req, res) => {
    let collectionName = req.body.userId;
    let ingredientID = req.body.trackedIngID;
    Ingredient.getIngredientInfo(req.db, collectionName, ingredientID)
        .then((result) => {
            res.status(202).send({
                obj: result,
                message: 'Ingredient Information Successfully retrieved',
            });
        })
        .catch((err) => {
            res.status(404).send({
                obj: err,
                message: 'Failed to get ingredient info',
            });
        });
};

/**
 * Controller that handles posts requests to /ingredient/real-time
 * In a near fututure, a web-socket will be used.
 * The db connection is opened in App.js and the collection is looked in the model.
 * @param req contains the data sent in req.body and db connection in req.db
 * @param res answers back the status of the request
 */
export const saveReadingToDB = async (req, res) => {
    //Create a function that can verify if the requests has an userid and if it is valid

    //Create Ingredient object and call its add method
    let ingredient = new Ingredient(
        req.body.ingId,
        req.body.weight,
        req.body.weightFluc,
        req.body.accuracyWeight,
        req.body.time,
        req.body.userId,
    );

    // DESIGN CHOICE: the db collection will be its own userid
    let collectionName = req.body.userId;
    ingredient
        .addWeightReadingDb(req.db, collectionName)
        .then(() => {
            //Send
            res.status(202).send({
                message: 'Weight successfully added to the DB.',
            });
        })
        .catch(() => {
            //Handles rejects
            res.status(404).send({ message: 'Internal server error' });
        });
};
