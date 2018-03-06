//counter code
var button = document.getElementById('counter');

button.onclick = function(){
    
    //create a request object
    //Request are like open,get,post etc.
    var request=new XMLHttpRequest();
    
    
    //capture the response and store it in a variable
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            //take some action
            if(request.status === 200){     //request is succesful
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML=counter.toString();
            }
        }
        //not done yet
    };
    
    //make the request
    request.open('GET','http://u2016pritamkore.imad.hasura-app.io/counter',true);
    request.send(null);
};

//submit name


var submit=document.getElementById('submit-btn');
submit.onclick = function(){     // make a request to a server and send the name
  
   
   //1.create a request object ( //Request are like open,get,post etc.)
    var request=new XMLHttpRequest();
    
    
    //3.capture the response and store it in a variable
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            //take some action
            if(request.status === 200){     //request is succesful
                //capture a list of names and render it as a list 
                    var names =request.responseText;
                    names = JSON.parse(names);
                    var list ='';
                     for(var i=0;i<names.length;i++)
                     {
                      list += '<li>'+names[i]+'</li>';
                      }
                      //render the list of names
                      var ul =document.getElementById('namelist');//'namelist' id is taken from index.html file
                        ul.innerHTML = list;
               }        
            }
        //not done yet
    };
    
    //2.make the request
    var nameInput=document.getElementById('name');
    var name=nameInput.value;
    request.open('GET','http://u2016pritamkore.imad.hasura-app.io/submit-name?name='+ name ,true);
    request.send(null);
   };
   
   
   //counter code
var button = document.getElementById('counter');

button.onclick = function(){
    
    //create a request object
    //Request are like open,get,post etc.
    var request=new XMLHttpRequest();
    
    
    //capture the response and store it in a variable
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            //take some action
            if(request.status === 200){     //request is succesful
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML=counter.toString();
            }
        }
        //not done yet
    };
    
    //make the request
    request.open('GET','http://u2016pritamkore.imad.hasura-app.io/counter',true);
    request.send(null);
};

//submit username and password


var submit=document.getElementById('submit-button');
submit.onclick = function(){     // make a request to a server and send the name
  
   
   //1.create a request object ( //Request are like open,get,post etc.)
    var request=new XMLHttpRequest();
    
    
    //3.capture the response and store it in a variable
    request.onreadystatechange = function(){
        if(request.readyState === XMLHttpRequest.DONE){
            //take some action
            if(request.status === 200){     //request is succesful
                //capture a list of names and render it as a list 
                    console.log('Log in successfully');
                    alert('WELCOME TO MYSAPP');
               }        
               else if(request.status===403){
                   alert('username/password is incorrect');
               }
               else if(req.status===500){
                   alert('something went wrong on the server');
               }
            }
        //not done yet
    };
    
    //2.make the request
    var username=document.getElementById('username').value;
    var password=document.getElementById('password').value;
    console.log('username');
    console.log('password');
    request.open('POST','http://u2016pritamkore.imad.hasura-app.io/login' ,true);
    request.setRequestHeader('Content-type','application/json');   //same did it in ssh,curl command (for more info goto:'ThisPC/Pictures/imp_for_imad_ssh')
    request.send(JSON.stringify({username:username,password:password}));
   };