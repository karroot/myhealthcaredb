var express  = require("express");
var app      = express();
var mongoose =require("mongoose");




var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));



//DATABASEURL variable for mongoAtlas
mongoose.connect("mongodb+srv://gabriele:qyun36zrbAZUYtv@myhealthcaredb-mpvmb.mongodb.net/test?retryWrites=true&w=majority" || "mongodb://localhost:27017/mongoDemo_v7", { useNewUrlParser: true }).catch(error => handleError(error));




//IP variable for heroku deploy
app.listen(process.env.PORT || 3000, function(){
    console.log("Server running on port 3000");
});