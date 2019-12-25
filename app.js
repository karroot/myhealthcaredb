const express = require("express");
const BodyParser = require("body-parser");
const mongoose = require('mongoose');

const CONNECTION_URL = "mongodb+srv://gabriele:qyun36zrbAZUYtv@myhealthcaredb-mpvmb.mongodb.net/test?retryWrites=true&w=majority";
const DATABASE_NAME = "example";

var app = express();
var PORT = process.env.PORT || 8080;

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGODB_URL || CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
} );

mongoose.connection.on('connected',() =>{
    console.log('connesso');
});
