import { Ingredient } from '../Models/Ingredient.js';
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
