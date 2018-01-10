import jQuery from 'jquery';
var $ = jQuery;
window.jQuery = require('jquery');
import Chart from 'chart.js';
var moment = require('moment');

class DrawMyGraph{
    constructor() {
        this.drawChartButton = $(".draw-chart-button");
        this.events();
        this.sensorArray = $(".sensor").toArray();
        //console.log(this.sensorArray);
        this.drawChartChart();
    }

    events() {
        //right clicking could allow a draw graph here context menu option
        //Providing a button. I will need to add some fields to accept user text
        this.drawChartButton.click(this.drawChartChart.bind(this));
    }

    getArrayValues(mySeries){
        function myArray( sensors ) {
            var a = [];
            for ( var i = 0; i < sensors.length; i++ ) {
              a.push( sensors[ i ].value );
            }
            return(a);
        }
        var myAO =[];
        for( var i in mySeries){
            var myA = myArray( $( '.sensor--value.'+mySeries[i] ).toArray().reverse() );
            //console.log("jquery: ", '.sensor--value.'+mySeries[i]);
            //console.log("mySeries:", mySeries[i]);
            //console.log("i:", i);
            myAO.push(myA);
            
        }
        //console.log("My AO:",myAO);
        //console.log($( `.sensor--value ${series}` ).toArray());
        
        
        return myAO;
    }
    getArrayTimes(){
        function myArray( sensors ) {
            var a = [];
            for ( var i = 0; i < sensors.length; i++ ) {
              a.push( moment(new Date(sensors[ i ].value)).local() );
            }
            return(a);
        }
        //console.log($( ".sensor--time" ).toArray());   
        var myA = myArray( $( ".sensor--time" ).toArray().reverse() );
        //console.log(myA);
        return myA;
    }
    getChartName(){
        
        function myArray( sensors ) {
            var a = [];
            
            a.push(sensors[0].textContent);
            if(a[0]==null){
                alert(sensors);
            }
            return(a);
        }
        //console.log($( ".sensor--name" ).toArray());
        var myA = myArray( $( ".sensor--name" ).toArray() );
        //console.log(myA[0]);
        return myA[0];
    }
    getSeriesArray(){
        function myArray (jqueryIn){
            var a = [];
            for(var i=1;i<jqueryIn.length-1;i++){
                a.push(jqueryIn[i].textContent);
            }
            //console.log(a);
            return a;
        }
        //console.log($("th").toArray());
        var myA = myArray($("th").toArray());
        return myA;
    }
    drawChartChart(){
        var mySeries = this.getSeriesArray();
        var myAValues = this.getArrayValues(mySeries);
        var myATimes = this.getArrayTimes();
        var myAName = this.getChartName();
        var timeFormat = 'MM/DD/YYYY HH:mm';
        //console.log("My Series", mySeries);
        //console.log("Values:", myAValues);
        //console.log("Times:", myATimes);
        var ctx = document.getElementById("myChart").getContext("2d");
        var dataSetObjectArray = [];

        var borderColors=[];
        var red = 0;
        var green = 0;
        var blue = 0;
        var alpha =0.0;
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
        }
        for (var i in mySeries ){
            //console.log(mySeries[i]);
            if(mySeries[i]=="risingEdge"){
                red = 255;
                green = 0;
                blue = 0;
            } else if(mySeries[i]=="fallingEdge") {
                red = 0;
                green = 255;
                blue = 0;
            } else if(mySeries[i]=="updateSpot") {
                red = 255;
                green = 255;
                blue = 255;
            } else {
                red = getRandomInt(100,255);
                green = getRandomInt(100,255);
                blue = getRandomInt(100,255);
            }
            if(mySeries[i]=="updateSpot"){
                console.log(mySeries[i]);
            }
            alpha = 1;
            borderColors.push(`rgba(${red},${green},${blue},${alpha})`);
            dataSetObjectArray.push({
                label: mySeries[i],
                data: myAValues[i],
                pointRadius:5,
                pointHitRadius:25,
                fill:false,
                lineTension:0,
                spanGaps:false,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    borderColors[i]
                ],
                borderWidth: 1
            });
        }
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: myATimes,
                datasets: dataSetObjectArray
            },
            options: {
				responsive: true,
				title:{
					display:true,
					text:"in progress products shown using Chart.js"
				},
				scales: {
					xAxes: [{
                        type: "time",
                        time: {
                            unit: 'day',
                            unitStepSize: 1,
                            displayFormats: {
                               'day': 'MMM DD'
                            }
                        },
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Date'
						},
                        ticks: {
                            major: {
                                fontStyle: "bold",
                                fontColor: "#FF0000"
                            }
                        }
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'value'
						}
					}]
                },
                elements: {
                    point: {
                        pointStyle: 'star'
                    }
                }
			}
        });
        //myChart.canvas.parentNode.style.height = ;
        //console.log(myChart.canvas.parentNode.style.height);
        
    }
}


export default DrawMyGraph;