
var express = require('express');

var app = express();
app.listen(8080, function(){console.log('Server run on port 8080 ip adress 127.0.0.1')});
app.get('/', function(req, res){
    res.send('<h2 style="color: red;">Hello world!!!!</h2>');
});




