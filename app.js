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

var database, collectionPatient;
app.get('/', function (req, res) {
    res.sendFile('index.html', {root: __dirname })
   });

app.listen(port, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collectionPatient = database.collection("patients");
        collectionWorker = database.collection("workers");
        collectionIot = database.collection("iot");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

//PATIENTS

app.post("/patients", (request, response) => {
    collectionPatient.insert(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

app.get("/patients", (request, response) => {
    collectionPatient.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.get("/patient/:id", (request, response) => {
    collectionPatient.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});


//WORKERS
app.get("/workers", (request, response) => {
    collectionWorker.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.get("/worker/:id", (request, response) => {
    collectionWorker.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

//IOT
app.get("/iot", (request, response) => {
    collectionIot.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.get("/iot/:id", (request, response) => {
    collectionIot.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.get("/patients/iot", (request, response) => {

    collectionIot.aggregate( [{
        $lookup:
        {
            from:"iot",
            localField:"patient_id",
            foreignField: "_id",
            as:"patient_iot" 
        }
    }]).toArray( (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});


app.get("/iot/patient/:id", (request, response) => {
    collectionIot.find({ "iotDevice.patient_id": request.params.id }).toArray(function(error, result){
        if(error) {
            return response.status(500).send(error);
        }
        console.log(result);
        response.send(result);
    });
});



app.get("/iot/device/:id", (request, response) => {
    collectionIot.find({ "iotDevice.id": request.params.id }).toArray(function(error, result){
        if(error) {
            return response.status(500).send(error);
        }
        console.log(result);
        response.send(result);
    });
});