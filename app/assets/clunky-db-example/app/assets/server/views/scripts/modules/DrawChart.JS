import jQuery from 'jquery';
var $ = jQuery;
window.jQuery = require('jquery');
import Chart from 'chart.js';


class DrawMyGraph{
    constructor() {
        this.drawChartButton = $(".draw-chart-button");
        this.events();
        this.sensorArray = $(".sensor").toArray();
        //console.log(this.sensorArray);
    }

    events() {
        console.log("button Clicked");
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