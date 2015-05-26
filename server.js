
var express = require('express');

var app = express.createServer();
app.listen(8080, '127.0.0.1', function(){console.log('Server run on port 8080 ip adress 127.0.0.1')});
app.get('/', function(req, res){
    res.send('<h2 style="color: red;">Hello world!!!!</h2>');
});




