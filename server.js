//source code of web server, which actually runs on web server
//software packages
var express = require('express');//'express' library is used to create web server.Used for handling http connections,learning how to access                                         ports.All are defined here
var morgan = require('morgan');//'morgan' library help us output logs of servers that we know what request are comming to a server and how we are responding(i.e how server responds us)
var path = require('path');

//to connect to postgres-db, we require the following things
var Pool=require('pg').Pool;//to create an instance of pool (for more information goto "https://github.com/brianc/node-pg-pool")

var config= {
  user:'u2016pritamkore',
  database:'u2016pritamkore',
  host:'db.imad.hasura-app.io',
  port:'5432',
  password:process.env.DB_PASSWORD    //environment variable:'DB_PASSWORD'. To acsess the env. variable use 'process.env'
};

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {//'get' request make to '/' so that the given function is executed
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));//'sendFile' function is used to pickup the file UI/INDEX.HTML which is available to us and we send the content of that file
});

//connecting postgress-database to js
//for more information goto-"https://node-postgres.com/features/connecting"

  
    /*connection pool is created outside server request
      last for as long as your app is running */
var pool=new Pool(config);  //see config variable above
app.get('/test-db',function(req,res){       
    //make a select request
    //return a response with the result
    pool.query('SELECT * FROM test', function(err,result){       //'test' is the table created in 'http://db.imad.hasura-app.io'
        if(err){
            res.status(500).send(err.toString());
        } else{
            res.send(JSON.stringify(result.rows));
        }
    });                              
});

app.get('/ui/article1',function(req,res){
   res.sendFile(path.join(__dirname,'ui','article1.html')); 
});

app.get('/articles/:articleName',function(req,res){
   //articleName==article_name
   //articles[articleName]=={} content object for article_name
             //SELCT * FROM article WHERE title= article_name
   pool.query('SELECT * FROM article WHERE title= '+req.params.articleName+function(err,result){
       if(err){
           res.status(500).send(err.toString());
       }
       else{
           if(result.rows.length===0){
               res.status(404).send('Article not found');
           }else{
               var articleData=result.rows[0];
               res.send(createTemplate(articleData));
           }
       }
   });
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
    res.send(counter.toString());
});

var names=[];
app.get('/submit-name',function(req,res){  // '/submit-name?name=xxx'(after ? its query parameter)
   //get the name from the request
   var name=req.query.name;
   
   names.push(name);
   //JSON: Javascript Object Notation
   res.send(JSON.stringify(names)); // since res.send accepts string the array 'names' is converted into strings using JSON
});
// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
