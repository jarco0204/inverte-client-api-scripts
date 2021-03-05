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
}
