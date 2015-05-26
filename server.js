
var express = require('express');
var mongodb = require('mongodb');

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var MongoClient = mongodb.MongoClient;


var connection_string = '127.0.0.1:27017/recommendfilm';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}




var app = express.createServer();


app.listen(port, ipaddress, function(){console.log('Server runs...')});

//routes
app.get('/', function(req, res){
    res.send('<h2 style="color: red;">Hello world!!!!</h2>');
});

app.get('/users', function(req, res){
    MongoClient.connect('mongodb://'+connection_string, function (err, db) {
        if (err) {
            res.send('error: '+err);
        } else {
            res.send('connected to db');
            var collection = db.collection('users').find().limit(10).toArray(function(err, docs) {
                res.send(JSON.stringify(collection));
                db.close();
            });
        }
    });
});




