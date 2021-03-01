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
     * Adds the ingredient and weight data from the Class object to the db.
     * First part connects to the collection. We have chosen to make each user its own collection.
     * @args dbConnection: db connection created in App.js and dbCollection is the name of the collection (userID)
     * @returns promise that represents the state of the addition to the db
     */

    async addWeightReadingDb(dbConnection, dbCollection) {
        let obj = this;
        let dbCol;
        // first section, trying to get the db connection
        try {
            dbCol = await _openDbCollection(dbConnection, dbCollection);
        } catch (err) {
            console.log('Cannot connect to DB collection');
            throw err;
        }
        // Second section
        return new Promise(function (resolve, reject) {
            dbCol.insertOne(obj.getDataInJSON(), (err, obj) => {
                if (err) reject(err);
                console.log('Weight Reading added');
                resolve(obj);
            });
        });
    }
}
