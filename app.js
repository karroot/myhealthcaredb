const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const dotenv = require('dotenv');
dotenv.config({path: 'variable.env'});
console.log(process.env.MONGODB_URL);
const CONNECTION_URL = process.env.MONGODB_URL;
const DATABASE_NAME = "example";
var port = process.env.PORT || 3000;
var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collection;
app.get('/', function (req, res) {
    res.send(JSON.stringify({ Hello: 'World'}));
   });

app.listen(port, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("patients");
        collection2 = database.collection("workers");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

//PATIENTS

app.post("/patients", (request, response) => {
    collection.insert(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

app.get("/patients", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.get("/patient/:id", (request, response) => {
    collection.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});


//WORKERS
app.get("/workers", (request, response) => {
    collection2.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.get("/worker/:id", (request, response) => {
    collection2.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

