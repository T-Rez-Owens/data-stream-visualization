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
    }

    events() {
        //right clicking could allow a draw graph here context menu option
        //Providing a button. I will need to add some fields to accept user text
        this.drawChartButton.click(this.drawChartChart.bind(this));
    }

    getArrayValues(){
        function myArray( sensors ) {
            var a = [];
            for ( var i = 0; i < sensors.length; i++ ) {
              a.push( sensors[ i ].value );
            }
            return(a);
        }
        console.log($( ".sensor--value" ).toArray());
        var myA = myArray( $( ".sensor--value" ).toArray().reverse() );
        console.log(myA);
        return myA;
    }
    getArrayTimes(){
        function myArray( sensors ) {
            var a = [];
            for ( var i = 0; i < sensors.length; i++ ) {
              a.push( moment(new Date(sensors[ i ].value)).local() );
            }
            return(a);
        }
        console.log($( ".sensor--time" ).toArray());   
        var myA = myArray( $( ".sensor--time" ).toArray().reverse() );
        console.log(myA);
        return myA;
    }
    getChartName(){
        //TODO dynamically get this from the sensor chosen.
        function myArray( sensors ) {
            var a = [];
            a.push(sensors[0].textContent);
            return(a);
        }
        //console.log($( ".sensor--name" ).toArray());
        var myA = myArray( $( ".sensor--name" ).toArray() );
        console.log(myA[0]);
        return myA[0];
    }
    drawChartChart(){
        var myAValues = this.getArrayValues( );
        var myATimes = this.getArrayTimes();
        var myAName = this.getChartName();
        var timeFormat = 'MM/DD/YYYY HH:mm';
        //console.log("chart:", myAValues);
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
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
				responsive: true,
				title:{
					display:true,
					text:"Chart.js Time Point Data"
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