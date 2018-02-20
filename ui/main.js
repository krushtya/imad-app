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
window.onload=function(){
var nameInput=document.getElementById('name');
var name=nameInput.value;
var submit=document.getElementById('submit_btn');
submit.onload = function(){
   // make a request to a serer and send the name
   
   //capture a list of names and render it as a list 
     var names=['name1','name2','name3'];
    var list ='';
     for(var i=0;i<names.length;i++){
         list += '<li>'+names[i]+'</li>';
     }
    var ul=document.getElementById('namelist');
    ul.innerHTML = list;
};
};