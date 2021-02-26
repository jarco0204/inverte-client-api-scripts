//Controller that handles GET requests to /ingredient/
// @args req.userID
// @returns JSON object containing the tracked ingredients
export const getTrackedIngredients = (req, res) => {
    console.log(req);
    res.status(202).send({ message: 'SUCCESS' });
};
