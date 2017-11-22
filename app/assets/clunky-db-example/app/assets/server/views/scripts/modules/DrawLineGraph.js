import jQuery from 'jquery';
var $ = jQuery;
window.jQuery = require('jquery');
import Chart from 'chart.js';


class DrawMyGraph{
    constructor() {
        this.c = $(".line-graph-canvas");
        this.drawCanvasButton = $(".draw-canvas-button");
        this.drawChartButton = $(".draw-chart-button");
        this.events();
        this.inTakt = $(".taktLG");
        this.inXWidth = $(".widthLG");
        this.inYHeight = $(".heightLG");
        this.inDataLength = $(".numberOfPointsLG");
        this.sensorArray = $(".sensor").toArray();
        //console.log(this.sensorArray);
    }

    events() {
        console.log("button Clicked");
        //right clicking could allow a draw graph here context menu option
        //Providing a button. I will need to add some fields to accept user text
        this.drawCanvasButton.click(this.drawTheGraph.bind(this));
        this.drawChartButton.click(this.drawChartChart.bind(this));
        
    }

    drawTheGraph() {
        //console.log(this.sensorArray);
        function myArray( sensors ) {
            var a = [];
            for ( var i = 0; i < sensors.length; i++ ) {
              a.push( sensors[ i ].value );
            }
            return(a);
        }
           
        var myA = myArray( $( ".sensor--value" ).toArray().reverse() );
        console.log("Canvas: ", myA);
        var ctx = document.getElementById('myCanvas').getContext("2d");
        var yOffset = 1;
        ctx.canvas.width=this.inXWidth.get(0).value;
        ctx.canvas.height=this.inYHeight.get(0).value;
        var xPosDest = ctx.canvas.width/10;
        var yPosDest = ctx.canvas.height/1.2;
        ctx.textBaseline="middle";
        ctx.textAlign="center";
        ctx.font='600 2rem Arial';
        ctx.translate(0,ctx.canvas.height);
        var rect = this.c.get(0).getBoundingClientRect();
        
        //Draw TAKT line
        ctx.beginPath();
        ctx.moveTo (0,-this.inTakt.get(0).value);
        console.log(0 + "," + "-" + this.inTakt.get(0).value);
        ctx.lineTo (this.inXWidth.get(0).value,-this.inTakt.get(0).value);
        console.log(this.inXWidth.get(0).value + "," + "-" + this.inTakt.get(0).value);
        ctx.strokeStyle="red";
        ctx.stroke();

        //Draw Demo path
        ctx.beginPath();
        ctx.strokeStyle="black";
        ctx.moveTo(0, ctx.canvas.height);
        ctx.lineTo(xPosDest,-yPosDest);
        console.log(xPosDest + "," + "-" + yPosDest);
        drawText(xPosDest,-yPosDest);
        for ( var i = 0; i < myA.length; i++ ) {
            xPosDest=xPosDest+(ctx.canvas.width/10);
            yPosDest = myA[i];
            
            drawText(xPosDest,-yPosDest);
            
        }
        xPosDest = ctx.canvas.width/10;
        yPosDest = ctx.canvas.height/1.2;
        yOffset = 1;
        
        for ( var i = 0; i < myA.length; i++ ) {
            xPosDest=xPosDest+(ctx.canvas.width/10);
            yPosDest=myA[i];
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
            ctx.fillRect(destX-110,destY-30,225,40);
            ctx.fillStyle = "#3333ff";
            ctx.fillText("(" + round(destX,1) + " , "+ round(destY,1) + ")",(destX),(destY-10));    
        }
        
        function round(value, decimals) {
            return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
        }
        
    }
    getArrayValues(){
        function myArray( sensors ) {
            var a = [];
            for ( var i = 0; i < sensors.length; i++ ) {
              a.push( sensors[ i ].value );
            }
            return(a);
        }
           
        var myA = myArray( $( ".sensor--value" ).toArray().reverse() );
        console.log(myA);
        return myA;
    }
    getArrayTimes(){
        function myArray( sensors ) {
            var a = [];
            for ( var i = 0; i < sensors.length; i++ ) {
              a.push( sensors[ i ].value );
            }
            return(a);
        }
           
        var myA = myArray( $( ".sensor--time" ).toArray().reverse() );
        console.log(myA);
        return myA;
    }
    
    drawChartChart(){
        var myAValues = this.getArrayValues( );
        var myATimes = this.getArrayTimes();
        var myAName = "lux";
        var timeFormat = 'MM/DD/YYYY HH:mm';
        console.log("chart:", myAValues);
        var ctx = document.getElementById("myChart").getContext("2d");
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: myATimes,
                datasets: [{
                    label: myAName,
                    data: myAValues,
                    pointRadius:5,
                    pointHitRadius:25,
                    fill:false,
                    lineTension:0,
                    spanGaps:false,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                
                scales: {
                    type: "time",
                    time: {
                        format: timeFormat,
                        // round: 'day'
                        tooltipFormat: 'll HH:mm'
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Date'
                    },
                    yAxes: [{
                        scaleLabel: {
							display: true,
							labelString: 'value'
                        },
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
        //myChart.canvas.parentNode.style.height = ;
        console.log(myChart.canvas.parentNode.style.height);
        
    }
}


export default DrawMyGraph;