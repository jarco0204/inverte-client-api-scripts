//Utils function
const _openDbCollection = async (db, collectionName) => {
    try {
        // console.log(db);
        return await db.collection(collectionName);
    } catch (err) {
        console.log(err);
    }
};

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
     * Consult with Dr.Soares some matters.
     * @param {*} dbConnection
     * @param {*} colName
     * @param {*} ingredientID
     */
    static async addIngredientID(dbConnection, colName, ingredientID) {
        let dbCol;
        // first section, trying to get the db connection
        try {
            dbCol = await _openDbCollection(dbConnection, colName);
        } catch (err) {
            console.log('Cannot connect to DB collection');
            throw err; //Will error be handled by catch() at controller
        }
        // Second section, find if the array exists or not
        let tracked;
        try {
            tracked = await dbCol.findOne({
                trackedIngs: { $exists: true },
            });
            console.log(tracked);
            if (tracked) {
                //If the above query returns an object
                tracked.trackedIngs.push(ingredientID); //Need to add a mechanism to prevent same items to be added
            } else {
                //Since this document has not been created, go ahead create it and return
                return new Promise(function (resolve, reject) {
                    dbCol.insertOne(
                        { trackedIngs: [ingredientID] },
                        (err, obj) => {
                            if (err) reject(err);
                            resolve(obj);
                        },
                    );
                });
            }
            //NOTE: in order to prevent getting a null object, you need to add this object before anything else
        } catch (err) {
            console.log(
                'An error happened while retrieving the trackedIDs array',
            );
            throw err; //Will error be handled by catch() at controller
        }

        return new Promise(function (resolve, reject) {
            dbCol.updateOne(
                { _id: tracked._id },
                { $set: { trackedIngs: tracked.trackedIngs } },
                (err, obj) => {
                    if (err) reject(err);
                    console.log('Successfully added an ingredient');
                    resolve(obj);
                },
            );
        });
    }
    /**
     * Static method to delete a tracked ingredient
     * @param {*} dbConnection
     * @param {*} dbCollection
     * @param {*} IngredientID
     */
    static async deleteIngredientID(dbConnection, dbCollection, ingredientID) {
        let dbCol;
        // first section, trying to get the db connection
        try {
            dbCol = await _openDbCollection(dbConnection, dbCollection);
        } catch (err) {
            console.log('Cannot connect to DB collection');
            throw err; //Will error be handled by catch() at controller
        }

        // This section looks for the element and deletes it
        let tracked;
        try {
            tracked = await dbCol.findOne({
                trackedIngs: { $exists: true },
            });
            console.log(tracked);
            if (tracked) {
                //There is not an else since this method should only execute when an item has been added
                for (let i = 0; i < tracked.trackedIngs.length; i++) {
                    if (tracked.trackedIngs[i] == ingredientID) {
                        tracked.trackedIngs.splice(i, 1); //Delete such element
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
        //Next section adds the modified array to the db
        return new Promise(function (resolve, reject) {
            dbCol.updateOne(
                { _id: tracked._id },
                { $set: { trackedIngs: tracked.trackedIngs } },
                (err, obj) => {
                    if (err) reject(err);
                    console.log('Successfully deleted an ingredient');
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
        //Nested private function

        let obj = this;
        let dbCol;
        // first section, trying to get the db connection
        try {
            dbCol = await _openDbCollection(dbConnection, dbCollection);
        } catch (err) {
            console.log('Cannot connect to DB collection');
            throw err; //Will error be handled by catch() at controller
        }
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
     * Static method to retrieve the tracked ingredients id of a user
     *
     */
    // static async getIngredientsIds(dbConnection, dbCollection) {
    //     //Note this code is repeated from above
    //     let obj = this;
    //     let dbCol;
    //     // first section, trying to get the db connection
    //     try {
    //         dbCol = await _openDbCollection(dbConnection, dbCollection);
    //     } catch (err) {
    //         console.log('Cannot connect to DB collection');
    //         throw err; //Will error be handled by catch() at controller
    //     }
    //     return new Promise((resolve, reject) => {
    //         dbCol.find();
    //     });
    // }
}
