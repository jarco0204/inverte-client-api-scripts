import { openDbCollection } from '../Utils/db.js';
/**
 * The class Ingredient that handles operations to the db.
 * Some methods are static since it is not required to create a new object.
 */

export class Ingredient {
    // Constructor of the class, instantiated in Controller
    constructor(id, weight, weightFluc, accuracyPortion, time, userId) {
        this.ingId = id;
        this.weight = weight;
        this.weightFluc = weightFluc;
        this.accuracyPortion = accuracyPortion;
        this.time = time;
        this.userId = userId;
    }
    /**
     * @Returns the data in the correct format to add it to db.
     */
    getDataInJSON() {
        return {
            name: this.name,
            weight: this.weight,
            weightFlu: this.weightFluc,
            accuracy: this.accuracyPortion,
            time: this.time,
            userID: this.userId,
        };
    }
    /**
     * This is a static function that adds the id of a tracked ingredient to the array of tracked ingredients.
     * Each User is going to be its own collection; and document with _id=0 contains the essential data to speed up queries
     * @param {*} dbConnection
     * @param {*} colName
     * @param {*} ingredientID
     */
    static async addIngredientID(dbConnection, colName, ingredientID) {
        let dbCol;
        dbCol = await openDbCollection(dbConnection, colName);

        // Second section, find if the array exists or not
        let tracked;
        let modified = true;
        try {
            tracked = await dbCol.findOne({
                _id: 0,
            });
            // console.log(tracked);

            if (tracked) {
                //Loop to prevent repeated items to be inserted
                for (let i = 0; i < tracked.trackedIngs.length; i++) {
                    if (tracked.trackedIngs[i] == ingredientID) {
                        modified = false; //the object is already in the list
                        break;
                    }
                }
                tracked.trackedIngs.push(ingredientID);
            } else {
                //Since this document has not been created, go ahead create it and return
                return new Promise(function (resolve, reject) {
                    // In Each user's collection the _id=0 contains all the info about
                    dbCol.insertOne(
                        { _id: 0, trackedIngs: [ingredientID] },
                        (err, obj) => {
                            if (err) reject(err);
                            resolve(obj);
                        },
                    );
                });
            }
        } catch (err) {
            console.log(
                'An error happened while retrieving the trackedIDs array',
            );
            throw err; //Will error be handled by catch() at controller
        }

        return new Promise(function (resolve, reject) {
            if (modified) {
                dbCol.updateOne(
                    { _id: tracked._id },
                    { $set: { trackedIngs: tracked.trackedIngs } },
                    (err, obj) => {
                        if (err) reject(err);
                        console.log('Successfully added an ingredient');
                        resolve(obj);
                    },
                );
            } else {
                console.log(
                    "IngredientID was not added because it's already in the array. ",
                );
                reject();
            }
        });
    }
    /**
     * Static method to delete a tracked ingredientID
     * Tested that it will not delete if id is not there or if _id=0 was not created
     * NOTE: this method will also delete the ingredientData associated with that id inside _id=0
     * @param {*} dbConnection
     * @param {*} dbCollection
     * @param {*} IngredientID
     */
    static async deleteIngredientID(dbConnection, dbCollection, ingredientID) {
        // first section, trying to get the db collection
        let dbCol;
        dbCol = await openDbCollection(dbConnection, dbCollection);

        // This section looks for the element and deletes it
        let tracked;
        let deleted; //Tracks to see if an item has been deleted or not
        try {
            tracked = await dbCol.findOne({
                _id: 0,
            });
            // console.log(tracked);
            if (tracked) {
                //There is not an else since this method should only execute when an item has been added
                for (let i = 0; i < tracked.trackedIngs.length; i++) {
                    if (tracked.trackedIngs[i] == ingredientID) {
                        tracked.trackedIngs.splice(i, 1); //Delete such element
                        deleted = true;
                        //This section deletes the ingredientData associated with that ingredientID
                        try {
                            let ingredientDataToRemove = ingredientID + '_data'; //this is how we add ingredientData
                            await dbCol.updateOne(
                                { _id: 0 },
                                { $unset: { [ingredientDataToRemove]: true } },
                            );
                        } catch (err) {
                            console.log(
                                'Error while deleting the ingredientData',
                            );
                            throw err;
                        }
                        break; // No need to keep going
                    }
                }
            }
        } catch (err) {
            console.log(
                'An error happened while retrieving the trackedIDs array',
            );
            throw err; //Will error be handled by catch() at controller
        }
        //Next section adds back the modified array to the db
        return new Promise(function (resolve, reject) {
            if (deleted) {
                dbCol.updateOne(
                    { _id: tracked._id },
                    { $set: { trackedIngs: tracked.trackedIngs } },
                    (err, obj) => {
                        if (err) reject(err);
                        console.log('IngredientID was suceesfully deleted');
                        resolve(obj);
                    },
                );
            } else {
                console.log(
                    'No Id was deleted; either _id=0 does not exists or ingredientID is not there',
                );
                reject();
            }
        });
    }
    /**
     * Handles POST requests to /ingredient/info
     * Adds the information array for the first time
     * Static method that adds the ingredient info to the database based on its ID
     * Tested that it will not add if id is not there or if _id=0 was not created
     * @param {*} dbConnection
     * @param {*} dbCollection
     * @param {*} ingredientID
     * @param {*} dataIngredient: array containing [name,correctPortion]
     */
    static async addIngredientInfo(
        dbConnection,
        dbCollection,
        ingredientID,
        dataIngredient,
    ) {
        let dbCol;
        dbCol = await openDbCollection(dbConnection, dbCollection);

        //Section that checks to see if ingredientID exists
        let trackedIDs;
        let found;
        try {
            trackedIDs = await dbCol.findOne({
                _id: 0,
            });
            // console.log(tracked);
            if (trackedIDs) {
                //There is not an else since this method should only execute after adding an ingredientID
                for (let i = 0; i < trackedIDs.trackedIngs.length; i++) {
                    if (trackedIDs.trackedIngs[i] == ingredientID) {
                        found = true;
                        break; // No need to keep going
                    }
                }
            }
        } catch (err) {
            console.log(
                'An error happened while retrieving the trackedIDs array',
            );
            throw err; //Will error be handled by catch() at controller
        }
        //Return the promise based on the result of found
        return new Promise(function (resolve, reject) {
            if (found) {
                let addKey = ingredientID + '_data'; // Dynamically creating key; NOTE it cannot contain .
                dbCol.updateOne(
                    { _id: 0 },
                    { $set: { [addKey]: dataIngredient } },
                    (err, obj) => {
                        if (err) reject(err);
                        console.log('Ingredient data successfully added');
                        resolve(obj);
                    },
                );
            } else {
                console.log('The ID has not been created yet');
                reject();
            }
        });
    }
    /**
     * Handles GET requests to /ingredient/info
     * Retrieves the data associated with that ingredientID
     * @param {*} dbConnection
     * @param {*} dbCollection
     * @param {*} ingredientID
     *
     */
    static async getIngredientInfo(dbConnection, dbCollection, ingredientID) {
        // first section, trying to get the db connection
        let dbCol;
        dbCol = await openDbCollection(dbConnection, dbCollection);

        //Next section
        return new Promise(function (resolve, reject) {
            dbCol.findOne(
                {
                    _id: 0,
                },
                (err, obj) => {
                    if (err) reject(err);
                    try {
                        let dataKey = ingredientID + '_data'; // This is how data is added

                        if (obj[dataKey]) {
                            console.log(
                                'Successfully retrieved individual ingredient data',
                            );
                            resolve(obj[dataKey]);
                        } else {
                            console.log('IngredientID is not correct');
                            reject({
                                error:
                                    'Either IngredientID is invalid or IngredientData has not been added',
                            });
                        }
                    } catch (err) {
                        console.log(
                            'Internal server error when retrieving ingredient data',
                        );
                        reject(err);
                    }
                },
            );
        });
    }
    /**
     * Update the portion of a tracked ingredient
     * @param {*} dbConnection
     * @param {*} dbCollection
     * @param {*} ingredientID
     * @param {*} newCorrectPortionWeight
     *
     */
    static async updateCorrectPortion(
        dbConnection,
        dbCollection,
        ingredientID,
        newCorrectPortionWeight,
    ) {
        // first section, trying to get the db connection
        let dbCol;
        dbCol = await openDbCollection(dbConnection, dbCollection);
        // Next section retrieves the data document of each collection _id=0
        let ingredientsData;
        try {
            ingredientsData = await dbCol.findOne({
                _id: 0,
            });
        } catch (err) {
            console.log(
                'An error happened while retrieving the trackedIDs array',
            );
            throw err; //Will error be handled by catch() at controller
        }
        // console.log(ingredientsData);
        // Next section gets the ingredient's data array | format of key is ingredientID+"_data"
        let ingredientData;
        let ingredientKey;
        // Try/catch not detecting incorrect key
        try {
            ingredientKey = ingredientID + '_data';
            ingredientData = ingredientsData[ingredientKey];
        } catch (err) {
            console.log('Incorrect key');
            throw err;
        }
        //Next section updates the portion with the new one.
        // DESIGN DECISION: ingredientData = [name, correctPortionWeight]
        ingredientData[1] = newCorrectPortionWeight;
        // console.log(ingredientData);

        //Return with a promise that updates the new ingredient data
        return new Promise(function (resolve, reject) {
            dbCol.updateOne(
                { _id: 0 },
                { $set: { [ingredientKey]: ingredientData } },
                (err, obj) => {
                    if (err) reject(err);
                    console.log('Ingredient Portion successfully updated');
                    resolve(obj);
                },
            );
        });
    }
    /**
     * Adds the ingredient and weight data from the Class object to the db.
     * First part connects to the collection. We have chosen to make each user its own collection.
     * @args dbConnection: db connection created in App.js and dbCollection is the name of the collection (userID)
     * @returns promise that represents the state of the addition to the db
     */

    async addWeightReadingDb(dbConnection, dbCollection) {
        let obj = this;
        let dbCol;
        dbCol = await openDbCollection(dbConnection, dbCollection);
        // first section, trying to get the db connection

        //Second section, adds a list of the tracked ingredients to faciliate GET requests
        // try {
        //     _addIngredientIDToList(dbCol, this.ingId);
        // } catch (err) {
        //     console.log('Error while adding tracked ingredient id');
        //     throw err;
        // }
        // Third section
        return new Promise(function (resolve, reject) {
            dbCol.insertOne(obj.getDataInJSON(), (err, obj) => {
                if (err) reject(err);
                console.log('Weight Reading added');
                resolve(obj);
            });
        });
    }

    /**
     * Static method to retrieve ALL the tracked ingredients ID of a user.
     * This method is called in Ingredients.js controller
     * @param {*} dbConnection
     * @param {*} dbCollection
     */
    static async getAllIngredientsID(dbConnection, dbCollection) {
        // first section, trying to get the db connection
        let dbCol;
        dbCol = await openDbCollection(dbConnection, dbCollection);

        //Second section retrieves the trackedIDs array and returns it
        return new Promise(function (resolve, reject) {
            dbCol.findOne(
                {
                    trackedIngs: { $exists: true },
                },
                (err, obj) => {
                    if (err) reject(err);
                    if (obj.trackedIngs.length != 0) {
                        console.log(
                            'Successfully retrieved list of tracked ingredient ids',
                        );
                        resolve(obj);
                    } else {
                        console.log(
                            'The array is empty. This operation should not happen!',
                        );
                        reject(obj);
                    }
                },
            );
        });
    }
}
