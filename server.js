//source code of web server, which actually runs on web server
//software packages
var express = require('express');//'express' library is used to create web server.Used for handling http connections,learning how to access                                         ports.All are defined here
var morgan = require('morgan');//'morgan' library help us output logs of servers that we know what request are comming to a server and how we are responding(i.e how server responds us)
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {//'get' request make to '/' so that the given function is executed
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));//'sendFile' function is used to pickup the file UI/INDEX.HTML which is available to us and we send the content of that file
});

app.get('/ui/article1',function(req,res){
   res.sendFile(path.join(__dirname,'ui','article1.html')); 
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var counter =0;
app.get('/counter',function(req,res){
    counter=counter+1;
    console.log('counter');
});
// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
