var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//var Applicant = require('./models/applicants');
//var sendAppliedEmail = require('./mail/index.js');

var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + '/js'));
var port = process.env.PORT || 3000;

var uri = "mongodb+srv://gabriele:qyun36zrbAZUYtv@myhealthcaredb-mpvmb.mongodb.net/test?retryWrites=true&w=majority";


mongoose.connect(uri, {useNewUrlParser: true});
var db = mongoose.connection;

app.use(bodyParser.urlencoded({extended: true}));

app.post("/person", (request, response) => {
    collection.insert(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    });
});

app.get("/people", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});

app.get("/person/:id", (request, response) => {
    collection.findOne({ "_id": new ObjectId(request.params.id) }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result);
    });
});


const CONNECTION_URL = "mongodb+srv://gabriele:qyun36zrbAZUYtv@myhealthcaredb-mpvmb.mongodb.net/test?retryWrites=true&w=majority";