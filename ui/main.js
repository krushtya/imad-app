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
                      var ul =document.getElementById('namelist');//'namelist' id ia taken from index.html file
                        ul.innerHTML = list;
               }        
            }
        //not done yet
    };
    
    //2.make the request
    var nameInput=document.getElementById('name');
    var name=nameInput.value;
    request.open('GET','http://u2016pritamkore.imad.hasura-app.io/submit-btn?name='+ name ,true);
    request.send(null);
   };