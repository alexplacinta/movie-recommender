
var express = require('express');

var app = express.createServer();

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
app.listen(port, ipaddress, function(){console.log('Server run on port 8080 ip adress 127.0.0.1')});

//routes
app.get('/', function(req, res){
    res.send('<h2 style="color: red;">Hello world!!!!</h2>');
});




