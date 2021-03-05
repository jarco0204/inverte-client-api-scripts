import mongo from 'mongodb';

//Variables
const url = 'mongodb://localhost:27017';
const mongodb = new mongo.MongoClient(url, { useUnifiedTopology: true });
let dbObj;

/**
 * A function to stablish a connection with a MongoDB instance.
 */
export const connectToDB = async () => {
    // Connect the client to the server
    await mongodb.connect();
    dbObj = mongodb.db('inverte-api-server');
    console.log('Connected successfully to mongoDB');
    return dbObj;
};

//Function to get access to the db from the controller
export const openDbCollection = async (db, collectionName) => {
    try {
        return await db.collection(collectionName);
    } catch (err) {
        console.log('Error occurred when opening the db collection');
        throw err;
    }
};

/**
 * Closes the db connection opened by connectToDB.
 * Function called in App.js when server is closed.
 */
export const closeDBConnection = async () => {
    await mongodb.close();
};
//---------------------- Db queries ----------
/**
 * Method that looks for document with _id=0 where the most important information about a collection is stored
 * Assumes that the document with _id=0 was already created
 */
export const lookForImportantInfoDoc = async (dbCollection) => {
    return new Promise(function (resolve, reject) {
        try {
            let obj = dbCollection.findOne({
                _id: 0,
            });
            console.log('Successfully retrieved _id=0');
            resolve(obj);
        } catch (err) {
            console.log(
                'An error happened while retrieving the trackedIDs array',
            );
            reject(err); //error handled by catch() at controller
        }
    });
};
