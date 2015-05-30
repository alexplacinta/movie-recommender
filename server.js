//require drivers
var express = require('express');
var mongodb = require('mongodb');

//set server
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var app = express.createServer();
app.listen(port, ipaddress, function(){console.log('Server runs...')});

//database connection variables
var MongoClient = mongodb.MongoClient;
var connection_string = '127.0.0.1:27017/recommendfilm';
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}


//set routes
app.get('/', function(req, res){
    res.send('<h2 style="color: green;">Welcome to Recommender-movies REST SERVICE!!!!</h2>');
});

app.get('/recommendedmovies', function(req, res){
    MongoClient.connect('mongodb://'+connection_string, function (err, db) {
        if (err) {
            res.send({status: 'error', error: 'error: '+err});
        } else {
            var collection = db.collection('recommendedmovies');
            collection.find().limit(30).sort( { _id: -1 } ).toArray(function(err, docs) {
                if(err){
                    res.send({status: 'error', error: 'error: '+err});
                } else {
                    res.send({status: 'ok', data: docs});
                }
                db.close();
            });
        }
    });
});

app.post('/recommendedmovies', function(req, res){
res.send(JSON.stringify(req.payload));
    var data = {movie: req.body.movie, comment: req.body.comment};

    MongoClient.connect('mongodb://'+connection_string, function (err, db) {
        if (err) {
            res.send({status: 'error', error: 'error: '+err});
        } else {
            var collection = db.collection('recommendedmovies');
            collection.insert(data, function(err, result){
                if(err){
                    res.send({status: 'error', error: 'error: '+err});
                } else {
                    res.send({status: 'ok'});
                }
                
                db.close();
            });
        }
    });
});




