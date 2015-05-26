
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

app.get('/recommendedmovies', function(req, res){
    MongoClient.connect('mongodb://'+connection_string, function (err, db) {
        if (err) {
            res.send({status: 'error', error: 'error: '+err});
        } else {
            var collection = db.collection('recommendedmovies');
            collection.find().limit(10).toArray(function(err, docs) {
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
    res.send('checked work')
    var data = {'movie': req.body.movie, 'comment': req.body.comment};

    MongoClient.connect('mongodb://'+connection_string, function (err, db) {
        if (err) {
            res.send({status: 'error', error: 'error: '+err});
        } else {
            var collection = db.collection('recommendedmovies');
            collection.insert([data], function(err, result){
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




