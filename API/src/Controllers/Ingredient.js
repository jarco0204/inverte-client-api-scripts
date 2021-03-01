import { Ingredient } from '../Models/Ingredient.js';

//Controller that handles GET requests to /ingredient/
// @args req.userId
// @returns JSON object containing the tracked ingredients
export const getTrackedIngredients = (req, res) => {
    // NOTE need to validate that the user exists
    // Right not is only checking that this id is being passed
    // console.log(req.body.userId);
    if (req.body.userId) {
        res.status(202).send({ message: 'SUCCESS' });
    } else {
        res.status(404).send({ message: 'Invalid UserId' });
    }
};

// This is a controller that handles posts requests to /ingredient/real-time
// In a near fututure, a web-socket will be used
// The db connection is opened in the controller, the specific db collection is opened in Model
export const saveReadingToDB = async (req, res) => {
    //Create a function that can verify if the requests has an userid and if it is valid
    // console.log(req.body);

    let ingredient = new Ingredient(
        req.body.ingId,
        req.body.weight,
        req.body.weightFluc,
        req.body.accuracyWeight,
        req.body.time,
        req.body.userId,
    );

    // This next section should retrieve the user's collection based on their id
    let collectionName = req.body.userId;
    //Passing the db as middleware
    ingredient
        .addWeightReadingDb(req.db, collectionName)
        .then(() => {
            //Send
            res.status(202).send({
                message: 'Weight successfully added to the DB.',
            });
        })
        .catch(() => {
            res.status(404).send({ messge: 'Internal server error' });
        });
};
