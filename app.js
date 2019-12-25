var express = require('express');
var mongo = require("mongodb").MongoClient;

var dataURL = process.env.MONGODB_URI;

var app = express();

app.get('/', function (req, res) {
    
    res.writeHead(200, {'content-type':'application/JSON'});
    
    mongo.connect(dataURL, function(err, db) {
       if (err) throw err;
       
       var collection = db.collection('data');
       
       collection.insert({
           "key" :"test"
       }, function(err, data) {
          if (err) throw err;
          
          db.close();
          res.end(JSON.stringify(data["ops"][0]));
       });
    });
    
})

app.listen(process.env.PORT, function () {
  console.log('Example app listening on port!');
})