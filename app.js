var express  = require("express");
var app      = express();
var mongoose =require("mongoose");




var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));



//DATABASEURL variable for mongoAtlas
mongoose.connect("mongodb+srv://gabriele:qyun36zrbAZUYtv@myhealthcaredb-mpvmb.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true }).catch(error => handleError(error));




//IP variable for heroku deploy
app.listen(process.env.PORT || 3000, function(){
    console.log("Server running on port 3000");
});


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
