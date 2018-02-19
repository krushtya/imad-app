console.log('Loaded!');
var img = document.getElementById('madi');
var marginleft = 0;
function moveRightt(){
    marginLeft = marginLeft + 10;
    img.style.marginLeft = marginLeft + "px";
}
img.onclick = function(){
    var interval = setInterval(moveRight, 100);//move right in interval 100 ms
     
};