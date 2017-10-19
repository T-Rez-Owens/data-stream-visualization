
import jQuery from 'jquery';
var $ = jQuery;
window.jQuery = require('jquery');

class DrawLineGraph{
    constructor() {
        this.c = $(".line-graph-canvas");
        this.drawButton = $(".draw-canvas-button");
        this.events();
        this.inTakt = $(".taktLG");
        this.inXwidth = $(".widthLG");
        this.inYheight = $(".heightLG");
        this.inDataLength = $(".numberOfPointsLG");
    }

    events() {
        //right clicking could allow a draw graph here context menu option

        //Providing a button. I will need to add some fields to accept user text
        this.drawButton.click(this.drawTheGraph.bind(this));
    }

    drawTheGraph() {
        var ctx = document.getElementById('myCanvas').getContext("2d");
        var yOffset = 1;
        ctx.canvas.width=this.inXwidth.get(0).value;
        ctx.canvas.height=this.inYheight.get(0).value;
        var xPosDest = ctx.canvas.width/10;
        var yPosDest = ctx.canvas.height/1.2;
        ctx.textBaseline="middle";
        ctx.textAlign="center";
        ctx.translate(0,ctx.canvas.height);
        var rect = this.c.get(0).getBoundingClientRect();
        ctx.beginPath();
        ctx.moveTo (0,this.inTakt.get(0).value);
        ctx.lineTo (this.inXwidth.get(0).value,this.inTakt.get(0).value);
        ctx.strokeStyle="red";
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle="black";
        ctx.moveTo(0, ctx.canvas.height);
        ctx.lineTo(xPosDest,-yPosDest);
        console.log(xPosDest + "," + "-" + yPosDest)
        drawText(xPosDest,-yPosDest);
        for(i=0;i<this.inDataLength.get(0).value;i++){
            xPosDest=xPosDest*2;
            yOffset = yOffset*-1;
            yPosDest=yPosDest+((yPosDest/2)*yOffset);
            drawText(xPosDest,-yPosDest);
            
        }
        xPosDest = ctx.canvas.width/10;
        yPosDest = ctx.canvas.height/1.2;
        yOffset = 1;
        
        for(var i=0;i<this.inDataLength.get(0).value;i++){
            xPosDest=xPosDest*2;
            yOffset = yOffset*-1;
            yPosDest=yPosDest+((yPosDest/2)*yOffset);
            createPath(xPosDest,-yPosDest);
            
        }
        ctx.globalCompositeOperation="destination-over";
        ctx.strokeStyle="black";
        ctx.stroke();
        
        
        
        function createPath(destX,destY) {
            ctx.lineTo(destX,destY);
        }
        
        function drawText(destX,destY){
            ctx.globalCompositeOperation="source-over";
            ctx.fillStyle="#FF0000";
            ctx.fillRect(destX-35,destY-20,70,20);
            ctx.fillStyle = "#3333ff";
            ctx.fillText("(" + round(destX,1) + " , "+ round(destY,1) + ")",(destX),(destY-10));    
        }
        
        function round(value, decimals) {
            return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
        }
    }

}


export default DrawLineGraph;