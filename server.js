var express = require('express')
  , http = require('http');

var app = express(); 
var server = http.createServer(app);
 
app.get('/wines', function(req, res){
    res.send('i love drink vodka');
});
app.get('/', function(req, res){
    res.send('hello world');
});
 
app.listen(3000);
console.log('Listening on port 3000...');