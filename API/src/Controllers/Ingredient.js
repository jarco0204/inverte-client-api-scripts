//Controller that handles GET requests to /ingredient/
// @args req.userID
// @returns JSON object containing the tracked ingredients
export const getTrackedIngredients = (req, res) => {
    // NOTE need to validate that the user exists
    // Right not is only checking that this id is being passed
    if (req.body.userId) {
        res.status(202).send({ message: 'SUCCESS' });
    } else {
        res.status(404).send({ message: 'Invalid UserId' });
    }
};
