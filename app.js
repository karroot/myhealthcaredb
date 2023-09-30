const Express = require("express");
const BodyParser = require("body-parser");
const dotenv = require('dotenv');
dotenv.config({path: 'variable.env'});
const CONNECTION_URL = process.env.MONGODB_URL;
const DATABASE_NAME = "example";
var port = process.env.PORT || 3000;
var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

// Read the example.json file
const data = JSON.parse(process.env.EXAMPLE_JSON);

app.get('/', function (req, res) {
    res.sendFile('index.html', {root: __dirname })
});

app.listen(port, () => {
    console.log("Server is running on port " + port);
});

//PATIENTS
app.get("/patients", (request, response) => {
    console.log(data[0]._id)
    response.send(data); // Send patients data from the JSON file
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
    const filteredPatients = data.patients.filter((p) => p.user.bloodType === request.params.id);
    response.send(filteredPatients);
});

app.get("/patient/job/:id", (request, response) => {
    const filteredPatients = data.patients.filter((p) => p.user.job === request.params.id);
    response.send(filteredPatients);
});

app.get("/patient/profile/:id", (request, response) => {
    const filteredPatients = data.patients.filter((p) => p.user.profile === request.params.id);
    response.send(filteredPatients);
});

// WORKERS
app.get("/workers", (request, response) => {
    response.send(data.workers); // Send workers data from the JSON file
});

app.get("/worker/:id", (request, response) => {
    const worker = data.workers.find((w) => w._id === request.params.id);
    if (!worker) {
        return response.status(404).send("Worker not found");
    }
    response.send(worker);
});

// IOT
app.get("/iot", (request, response) => {
    response.send(data.iot); // Send iot data from the JSON file
});

app.get("/iot/:id", (request, response) => {
    const iotRecord = data.iot.find((iot) => iot._id === request.params.id);
    if (!iotRecord) {
        return response.status(404).send("IOT record not found");
    }
    response.send(iotRecord);
});

// IOT DEVICE
app.get("/iotDevices", (request, response) => {
    response.send(data.iotDevices); // Send iotDevices data from the JSON file
});

app.get("/iotDevice/:id", (request, response) => {
    const iotDevice = data.iotDevices.find((device) => device._id === request.params.id);
    if (!iotDevice) {
        return response.status(404).send("IOT device not found");
    }
    response.send(iotDevice);
});
