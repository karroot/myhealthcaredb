const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const dotenv = require('dotenv');
dotenv.config({path: 'variable.env'});
//console.log(process.env.MONGODB_URL);
const CONNECTION_URL = "mongodb+srv://gabriele:LudFigo97@myhealthcaredb.o5pugek.mongodb.net/?retryWrites=true&w=majority";
const DATABASE_NAME = "patients";
var port = process.env.PORT || 3000;
var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collectionPatient;
app.get('/', function (req, res) {
    res.sendFile('index.html', {root: __dirname })
   });

app.listen(port, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true, ssl: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collectionPatient = database.collection("patients");
        collectionWorker = database.collection("workers");
        collectionIot = database.collection("iot");
        collectionIotDev = database.collection("iotDevices");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

//PATIENTS


app.get("/patients", (request, response) => {
    collectionPatient.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.get("/patient/:id", (request, response) => {
    for (let key of Object.keys(data)) {    
    if (data[key]._id === request.params.id) 
        response.send(data[key]);
    }
    if (!patient) 
        return response.status(404).send("Patient not found");
    response.send(patient);
});

app.get("/patient/blood/:id", (request, response) => {
    collectionPatient.find({ "user.bloodType": request.params.id }).toArray(function(error, result){
        if(error) {
            return response.status(500).send(error);
        }
        console.log(result);
        response.send(result);
    });
});

app.get("/patient/job/:id", (request, response) => {
    collectionPatient.find({ "user.job": request.params.id }).toArray(function(error, result){
        if(error) {
            return response.status(500).send(error);
        }
        console.log(result);
        response.send(result);
    });
});

app.get("/patient/profile/:id", (request, response) => {
    collectionPatient.find({ "user.profile": request.params.id }).toArray(function(error, result){
        if(error) {
            return response.status(500).send(error);
        }
        console.log(result);
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
/* nope
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
*/

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
    collectionIot.find({ "iotDevices.id": request.params.id }).toArray(function(error, result){
        if(error) {
            return response.status(500).send(error);
        }
        console.log(result);
        response.send(result);
    });
});



//IOT DEVICE
app.get("/iotDevices", (request, response) => {
    collectionIotDev.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.get("/iotDevice/:id", (request, response) => {
    collectionIotDev.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});


