import express from 'express';
import ingredientRouter from './Routers/Ingredient.js';
import { connectToDB, closeDBConnection } from './Utils/db.js';
// import mongo from 'mongodb';

//Instantiation of main app
const app = express();
let server;

//DB initialization
//Gurantees that the connection is opened, once the server is started
async function loadDBClient() {
    try {
        await connectToDB();
    } catch (err) {
        throw new Error('Could not connect to the Mongo DB');
    }
}
loadDBClient();

//Middleware
app.use(express.json()); // support json encoded bodies
// app.use(express.urlencoded()); // support json encoded bodies

// Routes
app.use('/ingredient', ingredientRouter);

// Properly Close the DB connection before closing the server
process.on('SIGINT', () => {
    console.info('SIGINT signal received.');
    console.log('Closing Mongo Client.');
    closeDBConnection();
    server.close(() => {
        console.log('Http server closed.');
    });
});
// Start of the Express API
export const start = async () => {
    const port = 3000;
    server = app.listen(port, () => {
        console.log('Express API server is listening on port 3000');
    });
};
