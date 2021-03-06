//This is source code of web server, which actually runs on web server
//software packages
//'require' method is used to declare variables from library (mostly 'nodejs' library)
var express = require('express');//'express' library is used to create web server.Used for handling http connections,learning how to access                                         ports.All are defined here
var morgan = require('morgan');//'morgan' library help us output logs of servers that we know what request are comming to a server and how we are responding(i.e how server responds us)
var path = require('path');

//to connect to postgres-db, we require the following things
var Pool=require('pg').Pool;//to create an instance of pool (for more information goto "https://github.com/brianc/node-pg-pool")
var crypto=require('crypto');
var bodyparser=require('body-parser');
var session=require('express-session');  //used for cookies

var config= {
  user:'u2016pritamkore',
  database:'u2016pritamkore',
  host:'db.imad.hasura-app.io',
  port:'5432',
  password:process.env.DB_PASSWORD    //environment variable:'DB_PASSWORD'. To acsess the env. variable use 'process.env'
};

var app = express();
app.use(morgan('combined'));
app.use(bodyparser.json());   //We need to tell our express app that in case you see json content, load the json content in the req.body variablle(used in /create-user)
app.use(session({
    secret:'someRandomSecretValue',
    cookie:{maxAge:1000*60*60*24*30}
}));


//Know about 'function(req,res) goto:"https://stackoverflow.com/questions/4696283/what-are-res-and-req-parameters-in-express-functions"'
app.get('/', function (req, res) {//'get' request make to '/' so that the given function is executed
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));//'sendFile' function is used to pickup the file UI/INDEX.HTML which is available to us and we send the content of that file
});

//code for hash password
function hash(input,salt){
    //how do we create hash password. For more information goto:'https://nodejs.org/api/crypto.html#crypto_crypto_pbkdf2sync_password_salt_iterations_keylen_digest'
    
    var hashed=crypto.pbkdf2Sync(input,salt,100000,512,'sha512');     //"pbkdf2(Password-Based Key Derivation Function 2)"
    return ["pbkdf2Sync","10000",salt,hashed.toString('hex')].join('/');
}

app.get('/hash/:input',function(req,res){
    var hashstring= hash(req.params.input,'this-is-some-random-string');
    res.send(hashstring);
});

app.post('/create-user',function(req,res){
    
    //concept of curl is used
    
    //["username":"pritam", "password":"password"]  <= JSON object 
    var username=req.body.username;  //JSON request(JSON object is converted into username and password)
    var password=req.body.password;  //JSON request
    var salt=crypto.randomBytes(128).toString('hex');
    var dbstring=hash(password,salt);
    pool.query('INSERT INTO "user" (username,password) VALUES($1,$2)',[username,dbstring],function(err,result){
          if(err){
            res.status(500).send(err.toString());
        } else{
            res.send('User successfully created'+ username);
        }
    });
});

app.post('/login',function(req,res){
    var username=req.body.username;  //JSON request(JSON object is converted into username and password)
    var password=req.body.password;  //JSON request
   
    pool.query('SELECT * FROM "user" WHERE username =$1',[username],function(err,result){
          if(err){
            res.status(500).send(err.toString());
        } else{
            if(result.rows.length===0){
                 res.send(403).send('username/password is invalid');  //"403" =>'forbidden request'
                
            }
            else{
                //Match the password
                var dbstring=result.rows[0].password;
                var salt=dbstring.split('/')[2];
                var hashpassword=hash(password,salt);
                if(hashpassword===dbstring){
                    
                    
                 
            
                  //set a session
                  req.session.auth={userId:result.rows[0].id};
                  //set cookie with session id
                  //internally, on the server side, it maps the session id to an object
                  //{auth:{userId}}
                      res.send('User successfully logged in');
                }else{
                   res.send(403).send('username/password is invalid'); 
                }
            }
        }
    });
});

app.get('/check-login',function(req,res){
     if(req.session && req.session.auth && req.session.auth.userId){
       res.send('You are login'+req.session.auth.userId.toString());
   } else{
       res.send('You are not logged in');
   } 
   
});

app.get('/logout',function(req,res){
    delete req.session.auth;
    res.send('You are logged out');
});

var articleOne={        //creating object
  title:'Article-one|Pritam Kore',
  heading:'Article-One',
  date:'Sep 5, 2017',
  content:'Making the Most of Being at Home. We are all guilty of overlooking the gems that are on our own doorsteps at times. Sometimes the best experiences can be right under our noses but we don\'t discover them because we\'re too busy getting on with our everyday live'
};

function createTemplate (data){  //'data' is object
var title=data.title;
var date=data.date;
var content=data.content;
var heading=data.heading;
var htmltemplate=`
<html>
    <head>  
   <title>
      ${title}
   </title>
   <meta name="viewport" content="width=device-width, initial-scale=1"> 
   <link href="/ui/style.css" rel="stylesheet" />
   
</head>
<body>
    <div class="container">
    <div>
        <a href="/">Home</a>
    </div>
    <hr/>
    <h3>${heading}</h3>
     <div>
        ${date}
        </div>
        ${content}
    </div>
</body>

</html>

`;
return htmltemplate;
}
//connecting postgress-database to js
//for more information goto-"https://node-postgres.com/features/connecting"

  
    /*connection pool is created outside server request
      last for as long as your app is running */
      //code for database
  //see 'config' variable above
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

app.get('/tp/article-one',function(req,res){
   res.send(createTemplate(articleOne)); 
});
var pool=new Pool(config);
app.get('/articles/:articleName',function(req,res){               //":" is used to take input from URL  
   //articleName==article_name
   //articles[articleName]=={} content object for article_name
             //SELCT * FROM article WHERE title= 'article-one'
   pool.query("SELECT * FROM article WHERE title='"+req.params.articleName+"'", function(err,result){      //"req.params.articleName" is used which represents actual data in the code
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

app.get('/about',function(req,res){
    pool.query('SELECT * FROM xama',function(err,result){
        if(err){
          res.status(500).send(err.toString());
        }
        else{
         if(res.rows.length===0){
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
