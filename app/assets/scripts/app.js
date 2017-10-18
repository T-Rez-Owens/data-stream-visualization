var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var dataLength = 5;

var xPosOrigin = 0;
var yPosOrigin = 0;

var xPosDest = c.width/10;
var yPosDest = c.height/1.2;
var yOffset = -1;

ctx.textBaseline="middle";
ctx.textAlign="center";


ctx.moveTo(xPosOrigin,yPosOrigin);
ctx.lineTo(xPosDest,yPosDest);
ctx.globalCompositeOperation="destination-over";
ctx.stroke();
ctx.globalCompositeOperation="destination-over";
ctx.fillStyle="#FF0000";
ctx.fillRect(xPosDest-35,yPosDest-20,70,20);
ctx.globalCompositeOperation="source-over";
ctx.fillStyle = "#3333ff";
ctx.fillText("(" + round(xPosDest,1) + " , "+ round(yPosDest,1) + ")",(xPosDest),(yPosDest-10)); 

for(var i=0;i<dataLength;i++){
    xPosDest=xPosDest*2;
    yOffset = yOffset*-1;
    yPosDest=yPosDest-((yPosDest/2)*yOffset);
    drawLine(xPosDest,yPosDest);
}


function drawLine(destX,destY) {
    ctx.lineTo(destX,destY);
    ctx.stroke();
    ctx.globalCompositeOperation="destination-over";
    ctx.fillStyle="#FF0000";
    ctx.fillRect(destX-35,destY-20,70,20);
    ctx.globalCompositeOperation="source-over";
    ctx.fillStyle = "#3333ff";
    ctx.fillText("(" + round(destX,1) + " , "+ round(destY,1) + ")",(destX),(destY-10));    
}

function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}
