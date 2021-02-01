//import all packages
const mongoclient = require('mongodb').MongoClient;
const assert = require('assert');

const dboper = require('./dboperations');

//define constants to be used
const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

//connecting to mongodb. can only be performed when mongodb server is up and running in cmd
mongoclient.connect(url, {useUnifiedTopology:true},(err, client) => {
    assert.strictEqual(err, null);  //asserting that err is numm, if not error will be printed
    console.log('Connected correctly to server');

    //using the db and collection that are already created 
    const db = client.db(dbname);

    dboper.insertDocument(db, {name:"Vadonut", description:"test"}, 'dishes', (result) => {
        console.log('Insert Document: \n', result.ops);

        dboper.findDocuments(db, 'dishes', (docs) => {
            console.log('Found documents: \n' , docs );

            dboper.updateDocument(db, {name: "Vadonut"}, {description : "Updated Test"}, 'dishes', (result) => {
                console.log('Updated Document: \n' , result.result);

                dboper.findDocuments(db, 'dishes', (docs) => {
                    console.log('Found documents: \n' , docs );

                    db.dropCollection('dishes', (result) =>{
                        console.log('Dropped Collection: \n' , result);

                        client.close();
                    });
                });
            });
        })
    });
});
//note that all the actions are nested inside each other to ensure EACH OF THEM HAPPEN ONE AFTER THE OTHER
