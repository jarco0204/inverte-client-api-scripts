import express from 'express';
import ingredientRouter from './Routers/Ingredient.js';

//Instantiation of main app
const app = express();

//Middleware
app.use(express.json()); // support json encoded bodies

// Routes
app.use('/ingredient', ingredientRouter);

// Accepting requests
export const start = async () => {
    const port = 3000;
    app.listen(port, () => {
        console.log('Express API server is listening on port 3000');
    });
};
