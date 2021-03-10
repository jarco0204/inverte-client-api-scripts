import * as fs from 'fs'; // find better way
const path = './cheese.json';

const main = () => {
    let data = prepareData(); // data for ingredient table

    fs.writeFileSync(path, JSON.stringify(data), 'utf-8', function (err) {
        if (err) throw err;
    });
};

//Function to create the data
const prepareData = () => {
    let weightFoodPan = 2000; // In grams
    let cheeseData = {};
    let tempObj = [];
    let possibleWeightsFluc = [
        90,
        91,
        92,
        93,
        94,
        95,
        96,
        97,
        98,
        99,
        100,
        101,
        102,
        103,
        104,
        105,
        106,
        107,
        108,
        109,
        110,
    ]; // Range of fluctuations
    for (let i = 0; i < 20000; i++) {
        // Section 1: Check to see if food pan is empty
        let refill = false;
        if (weightFoodPan < 90) {
            weightFoodPan = 2000; // refill food pan
            refill = true;
        }
        // Section 2: weight fluctuation with randomness
        let fluct = possibleWeightsFluc[Math.floor(Math.random() * 20)]; // In range of 0-19
        weightFoodPan -= fluct;

        // Section 3: calculate accuracy of portion
        let accuracy;
        let correctPortionWeight = 100; // This value will be stored by the API
        accuracy = correctPortionWeight - fluct; // Numeric change suggested by Muhammad

        // Create one Ingredient object after scale detects weight change
        tempObj.push({
            weighingScaleID: 'subway_1',
            time: createTime(i),
            name: 'cheese',
            weightToBeUsed: correctPortionWeight,
            portionAccuracy: accuracy,
            CurrentWeightFoodPan: weightFoodPan,
            refill: refill,
            userID: 'johanArcos_5680',
            order: i,
        });
        cheeseData['cheese'] = tempObj; // new weight after employee grabs some
    }
    return cheeseData;
};

//Function to get a new date every 10 second
// Note that this is an estimate
const createTime = (numI) => {
    let timeObject = new Date();
    let multipler = Math.floor(numI * 1000 + 1); // In range of 1 - 1000*(19)
    let milliseconds = multipler * 1000; // Controls how many seconds it adds.
    return new Date(timeObject.getTime() + milliseconds).toLocaleString();
};
main(); //Main Function call
