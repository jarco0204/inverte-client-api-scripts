import express from 'express';
import ingredientRouter from './Routers/Ingredient.js';

//Instantiation of main app
const app = express();

//Middleware
app.use(express.json()); // support json encoded bodies

// Routes
app.use('/ingredient', ingredientRouter);

// Properly Close the DB connection before closing the server
// process.on('SIGINT', () => {
// 	console.info('SIGINT signal received.');
// 	console.log('Closing Mongo Client.');
// 	mongo.closeDBConnection();
// 	server.close(() => {
// 	  console.log('Http server closed.');
// 	});
//  });
// Start of the Express API
export const start = async () => {
    const port = 3000;
    app.listen(port, () => {
        console.log('Express API server is listening on port 3000');
    });
};
