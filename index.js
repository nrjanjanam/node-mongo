//import all packages
const mongoclient = require('mongodb').MongoClient;
const assert = require('assert');

//define constants to be used
const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

//connecting to mongodb. can only be performed when mongodb server is up and running in cmd
mongoclient.connect(url, {useUnifiedTopology:true},(err, client) => {
    assert.strictEqual(err, null);  //asserting that err is numm, if not error will be printed
    console.log('Connected correctly to server');

    //using the db and collection that are already created 
    const db = client.db(dbname);
    const collection = db.collection('dishes');

    //INSERT Operation
    collection.insertOne({"name": "Uthappizza", "description": "text"}, (err,result) => {
        assert.strictEqual(err,null);

        console.log('After insertion: \n');
        console.log(result.ops); //tells no of operations performed through ops

        //QUERY Operation
        collection.find({}).toArray((err, docs) =>{
            assert.strictEqual(err, null);

            console.log('Found: \n');
            console.log(docs); //all the documents will be printed

            //cleaning the collection
            db.dropCollection('dishes',(err, result) => {
                assert.strictEqual(err,null);

                client.close();
            });
        });
    });
});
//note that all the actions are nested inside each other to ensure EACH OF THEM HAPPEN ONE AFTER THE OTHER
