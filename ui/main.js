console.log('Loaded!');
var img = document.getElementById('madi');
var marginLeft = 0;
var interval;
function moveRight(){
    marginLeft = marginLeft + 25;
    img.style.marginLeft = marginLeft + "px";//concatnation
}
function moveLeft(){
    marginRight = marginRight + 25;
    img.style.marginRight = marginRight + "px";//concatnation
}
img.onclick = function(){
    if(marginLeft ===0)
     interval = setInterval(moveRight, 50);//move right in interval 50 ms
    if(marginRight===0)
        interval = setInterval(moveLeft, 50);//move left in interval 50 ms 
    
     
};