import * as fs from 'fs';
const path = './cheese.json';

const main = () => {
    let data = prepareData();
    console.log(data);
    fs.writeFileSync(path, JSON.stringify(data), 'utf-8', function (err) {
        if (err) throw err;
    });
};

//Function to create the data
const prepareData = () => {
    let initialWeight = 2000; // In grams
    let cheeseData = {};
    let tempObj = [];
    let possibleWeightsFluc = [90, 95, 100, 105, 120]; // Range of fluctuations
    for (let i = 0; i < 20; i++) {
        let fluct = possibleWeightsFluc[Math.floor(Math.random() * 4)]; // In range of 0-4
        let accuracy;
        if (fluct == 100) {
            accuracy = '=';
        } else if (fluct == 95) {
            accuracy = '-';
        } else if (fluct == 90) {
            accuracy = '--';
        } else if (fluct == 105) {
            accuracy = '+';
        } else {
            accuracy = '++';
        }
        tempObj.push({
            weight: initialWeight,
            time: createTime(i),
            weightFluc: fluct,
            accuracyWeight: accuracy,
        });
        initialWeight -= fluct; // All are perfect portions
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
