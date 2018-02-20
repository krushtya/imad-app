console.log('Loaded!');
var img = document.getElementById('madi');
var marginLeft = 0;
function moveRight(){
    marginLeft = marginLeft + 50;
    img.style.marginLeft = marginLeft + "px";//concatnation
}
img.onclick = function(){
    var interval = setInterval(moveRight, 50);//move right in interval 50 ms
     
};