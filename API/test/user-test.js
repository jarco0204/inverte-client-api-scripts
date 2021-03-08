import { connectToDB, openDbCollection, closeDBConnection, createDbCollection } from '../src/Utils/db.js';
import request from 'request';
import axios from 'axios';
import * as assert from 'assert';
import { User } from '../src/Models/User.js';

var db;
let userCollection;
let userCollectName;

// This method runs once and connects to the mongoDB
before(async () => {
    try {
        let userName = 'johanArcos_5680'
        db = await connectToDB();
        userCollection = await openDbCollection(db, userName);
        userCollectName = userName;

    } catch (err) {
        throw err;
    }
});

// this method will close your connection to MongoDB after the tests
after(async () => {
    try {
        closeDBConnection();
    } catch (err) {
        throw err;
    }

});

describe('Testing the User API', async () => {
    describe('Testing the User Model - Simple cases', () => {



        it('Pass 1 - Test success creation of an important information doc for the user', async () => {
            let commandRes = await User.createImportantInfoDoc(db, userCollectName);
            // test if collection correctly inserted the _id:0
            assert.strictEqual(commandRes.insertedId, 0);
        });
        it('Pass 2 - Test success adding weighing scale for the user', async () => {
            let commandRes = await User.addWeighingScaleID(db, userCollectName, 1);

            // test if 1 document is being modified 
            assert.strictEqual(commandRes.modifiedCount, 1);
        });
        it('Pass 3 - Test to get all the weighing scales ID', async () => {
            let commandRes = await User.getScales(db, userCollectName);

            // test to get all the weighing scales ID is [ 1 ]
            assert.notStrictEqual(commandRes, [1]);
        });
        it('Pass 4 - Test to add the scale data weighing scale', async () => {
            let commandRes = await User.addWeighingScaleData(db, userCollectName, 1, [userCollectName, "10"]);

            // test if 1 document is being modified 
            assert.strictEqual(commandRes.modifiedCount, 1);
        });
        it('Pass 5 - Test to get the weighing scale data associate with the scaleID', async () => {
            let commandRes = await User.getWeighingScaleData(db, userCollectName, 1);

            // test if weighting scale data is being return
            assert.notStrictEqual(commandRes, ['johanArcos_5680', '10']);
        });
        it('Pass 6 - Test to put the weighing scale name associated with this scaleID', async () => {
            let commandRes = await User.updateNameData(db, userCollectName, 1, "newNAME");

            // test if 1 document is being modified 
            assert.strictEqual(commandRes.modifiedCount, 1);
        });
        it('Pass 7 - Test to put the weighing scale associated with the scaleID', async () => {
            let commandRes = await User.updatePortionData(db, userCollectName, 1, "20");

            // test if 1 document is being modified 
            assert.strictEqual(commandRes.modifiedCount, 1);
        });
        it('Pass 8 - Test the deletetion of a weighing scale', async () => {
            let commandRes = await User.deleteWeighingScaleID(db, userCollectName, 1);

            // test if 1 document is being modified 
            assert.strictEqual(commandRes.modifiedCount, 1);
        });
    });

    describe('Testing the User API - Complex Cases', () => {
        describe('User', () => {
            var userUrl = 'http://localhost:3000/api/user';
            beforeEach(function (done) {
                setTimeout(function () {
                    done();
                }, 500);
            });

            describe('Success 1 - POST /create', () => {
                let data = {
                    userID: "johanArcos_5680"
                }
                it('POST /create', async () => {
                    // should create the doc for a user's collection using POST
                    request.post({
                        headers: { 'content-type': 'application/json' },
                        url: userUrl + "/create",
                        body: JSON.stringify(data)
                    }, (error, response, body) => {
                        assert.strictEqual(response.statusCode, 202);
                        assert.strictEqual(JSON.parse(response.body).message, "Successfully created the info doc");
                    });
                    try {
                        let obj = await userCollection.remove({ _id: 0 })
                        console.log(`obj `)
                    } catch (err) {
                        console.log(`err`)
                    }
                });

            });
            describe('Success 2 - POST /create; POST /weighingScale', () => {
                it('POST /weighingScale', () => {
                    let data = {
                        userID: "johanArcos_5680",
                        scaleID: 1
                    }
                    // should add the weighingScale to user's collection using POST
                    request.post({
                        headers: { 'content-type': 'application/json' },
                        url: userUrl + "/weighingScale",
                        body: JSON.stringify(data)
                    }, (error, response, body) => {
                        assert.strictEqual(response.statusCode, 202);
                        assert.strictEqual(JSON.parse(response.body).message, "Successfully linked the weighing scale to the user");
                    });
                });
            });

            describe('Success 3 - POST /weighingScale 2nd; POST /weighingScale/data; GET /weighingScale;', () => {
                it('POST /weighingScale 2nd', () => {
                    let data = {
                        userID: "johanArcos_5680",
                        scaleID: 2
                    }
                    // should add the weighingScale to user's collection using POST
                    request.post({
                        headers: { 'content-type': 'application/json' },
                        url: userUrl + "/weighingScale",
                        body: JSON.stringify(data)
                    }, (error, response, body) => {
                        assert.strictEqual(response.statusCode, 202);
                        assert.strictEqual(JSON.parse(response.body).message, "Successfully linked the weighing scale to the user");
                    });
                });
                it('POST /weighingScale/data', () => {
                    let data = {
                        userID: "johanArcos_5680",
                        scaleID: 2,
                        scaleData: "222"
                    }
                    // should add the weighingScale to user's collection using POST
                    request.post({
                        headers: { 'content-type': 'application/json' },
                        url: userUrl + "/weighingScale/data",
                        body: JSON.stringify(data)
                    }, (error, response, body) => {
                        assert.strictEqual(response.statusCode, 202);
                        assert.strictEqual(JSON.parse(response.body).message, "Successfully added the weighing scale data for the first time");
                    });
                });
                it('GET /weighingScale', () => {
                    let data = {
                        userID: "johanArcos_5680"
                    }
                    // should add the weighingScale to user's collection using POST
                    request.get({
                        headers: { 'content-type': 'application/json' },
                        url: userUrl + "/weighingScale",
                        body: JSON.stringify(data)
                    }, (error, response, body) => {
                        assert.strictEqual(response.statusCode, 202);
                        assert.strictEqual(JSON.parse(response.body).message, "Successfully retrieved all weighing scales");
                    });
                });
            });

        });

    });
    /*  beforeEach(async () => {
         const books = db.collection("books");
         books.drop();
       }); 

describe('Testing the Book API - Complex Cases', () => {
describe('Contacts', () => {
   var myurl = 'http://localhost:3000/books';
   let data = {
       id: 1,
       name: "Harry",
       authors: "JK",
       year: 2010,
       publisher: "Nort"
   }
   describe('Success 1 - POST /books, DELETE /books/:id', () => {
       it('POST /books', () => {
           // should create a new book using POST
           request.post({
               headers: { 'content-type': 'application/json' },
               url: myurl,
               body: JSON.stringify(data)
           }, (error, response, body) => {
               assert.strictEqual(body, '{"msg":"The book was successfully saved in the database"}');
           });
       })
       it('DELETE /books/:id', () => {
           //then DELETE the same book
           request.delete({
               headers: { 'content-type': 'application/json' },
               url: myurl + "/1",
               body: JSON.stringify(data)
           }, (error, response, body) => {
               assert.strictEqual(body, '{"msg":"The book was successfully deleted"}');
           });
       })
   });

   describe('Success 2 - POST /books, GET /books (retrieval greater than 1), DELETE /book/:id', () => {
       it('POST /books', () => {
           // should create a new book using POST
           request.post({
               headers: { 'content-type': 'application/json' },
               url: myurl,
               body: JSON.stringify(data)
           }, (error, response, body) => {
               assert.strictEqual(body, '{"msg":"The book was successfully saved in the database"}');
           });
       })
       it('GET /books (retrieval greater than 1', () => {
           request.get({
               headers: { 'content-type': 'application/json' },
               url: myurl
           }, (error, response, body) => {
               assert.strictEqual(body, '{"obj":{"_id":1,"name":"Harry","authors":"JK","year":2010,"publisher":"Nort"},"msg":"Book was successfully retrieved from the database"}');
           });
       })
       it('DELETE /books/:id', () => {
           //then DELETE the same book
           request.delete({
               headers: { 'content-type': 'application/json' },
               url: myurl + "/1",
               body: JSON.stringify(data)
           }, (error, response, body) => {
               assert.strictEqual(body, '{"msg":"The book was successfully deleted"}');
           });
       })
   });

   describe('Success 3 - POST /books, GET /books/:id, DELETE /book/:id', () => {
      //    You should guarantee (using assert) that your book was created, 
      // then that the fields of the retrieved book with GET are all the same, and then it was deleted. 

       // should create a new book using POST
       it('POST /books', () => {
           request.post({
               headers: { 'content-type': 'application/json' },
               url: myurl,
               body: JSON.stringify(data)
           }, (error, response, body) => {
               assert.strictEqual(body, '{"msg":"The book was successfully saved in the database"}');
           });
       })

       //query this book by id using a GET request
       it('GET /books/:id', () => {
           request.get({
               headers: { 'content-type': 'application/json' },
               url: myurl + "/1"
           }, (error, response, body) => {
               assert.strictEqual(body, '{"obj":{"_id":1,"name":"Harry","authors":"JK","year":2010,"publisher":"Nort"},"msg":"Book was successfully retrieved from the database"}');
           });
       })

       it('DELETE /books/:id', () => {
           //then DELETE the same book
           request.delete({
               headers: { 'content-type': 'application/json' },
               url: myurl + "/1",
               body: JSON.stringify(data)
           }, (error, response, body) => {
               assert.strictEqual(body, '{"msg":"The book was successfully deleted"}');
           });
       })
   });

   describe('Success 4 - POST /books, PUT /books/:id, GET /books/:id, DELETE /book/:id', () => {
       // should create a new book using POST
       it('POST /books', () => {
           request.post({
               headers: { 'content-type': 'application/json' },
               url: myurl,
               body: JSON.stringify(data)
           }, (error, response, body) => {
               assert.strictEqual(body, '{"msg":"The book was successfully saved in the database"}');
           });
       })

       //query this book by id using a GET request
       it('GET /books/:id', () => {
           request.get({
               headers: { 'content-type': 'application/json' },
               url: myurl + "/1"
           }, (error, response, body) => {
               assert.strictEqual(body, '{"obj":{"_id":1,"name":"Harry","authors":"JK","year":2010,"publisher":"Nort"},"msg":"Book was successfully retrieved from the database"}');
           });
       })

       //modify the data of this book with PUT
       it('PUT /books/:id', () => {
           let data2 = {
               id: 1,
               name: "Tim",
               authors: "JK",
               year: 2010,
               publisher: "Nort"
           }
           request.put({
               headers: { 'content-type': 'application/json' },
               url: myurl + "/1",
               body: JSON.stringify(data2)
           }, (error, response, body) => {
               assert.strictEqual(body, '{"msg":"Book successfully updated in the database"}');
           });
       })

       //then query this book by id using a GET request
       it('GET /books/:id', () => {
           request.get({
               headers: { 'content-type': 'application/json' },
               url: myurl + "/1"
           }, (error, response, body) => {
               assert.strictEqual(body, '{"obj":{"_id":1,"name":"Tim","authors":"JK","year":2010,"publisher":"Nort"},"msg":"Book was successfully retrieved from the database"}');
           });
       })
       it('DELETE /books/:id', () => {
           //then DELETE the same book
           request.delete({
               headers: { 'content-type': 'application/json' },
               url: myurl + "/1",
               body: JSON.stringify(data)
           }, (error, response, body) => {
               assert.strictEqual(body, '{"msg":"The book was successfully deleted"}');
           });
       })
   })

   describe('Success 5 - POST /books, POST /books (another book added), PUT /books/:id, GET /books/:id, DELETE /books/:id (first book), DELETE /books/:id (2nd book)', () => {

   });

   describe('Success 6 - DELETE /books/:id', () => {

       it('DELETE /books/:id', () => {
           //then DELETE the same book
           request.delete({
               headers: { 'content-type': 'application/json' },
               url: myurl + "/1",
               body: JSON.stringify(data)
           }, (error, response, body) => {
               assert.strictEqual(body, '{"msg":"No book is deleted. The database is empty"}');
           });
       })
   });
});
}); */
});