//Controller that handles GET requests to /ingredient/
// @args req.userID

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
export const saveReadingToDB = (req, res) => {
    //Create a function that can verify if the requests has an userid and if it is valid
    console.log(req);
    //Next we have to add it to db
    res.status(202).send({ message: 'Weight successfully added to the DB.' });
};
