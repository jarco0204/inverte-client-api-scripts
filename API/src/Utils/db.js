import mongo from 'mongodb';

//Variables
const url = 'mongodb://localhost:27017';
const mongodb = new mongo.MongoClient(url, { useUnifiedTopology: true });
let db;
//Functions

/**
 * A function to stablish a connection with a MongoDB instance.
 */
export const connectToDB = async () => {
    // Connect the client to the server
    await mongodb.connect();
    // Our db name is going to be contacts-db
    db = mongodb.db('inverte-api-server');
    console.log('Connected successfully to mongoDB');
    return db;
};

//Function to get access to the db from the controller
export const getDb = async () => {
    return db;
};

export const closeDBConnection = async () => {
    await mongodb.close();
};
