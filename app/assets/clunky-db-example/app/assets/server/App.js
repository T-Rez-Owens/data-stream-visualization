/* jshint node: true */
/*jshint esversion: 6 */
'use strict';
var expressApp = require('express'),
app = expressApp(),
enginesApp = require('consolidate'),
bodyParserApp = require('body-parser'),
assertApp = require('assert'),
momentApp = require('moment'),
pathApp = require('path'),
MongoSApp = require('./modules/MongoDB');
require('dotenv').load();
var uriApp = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.PORT+'/'+process.env.DB;            
var serverApp;
serverApp = new MongoSApp(uriApp);
var XLSX = require('XLSX');
console.log(process.env.SYSTEM);


const requestApp = require('superagent');

class App {
    constructor() {
        return this;
    }
    superagent(url,callback) {
        requestApp.get(url, function(err, res){
            if (err) throw err;
            //console.log(res.text);
            //console.log(res);
            callback(res.text);
        });
    }
    main(callback) {
        app.use(expressApp.static(pathApp.join(__dirname + '/views/temp')));
        
        app.set('view engine', 'html');
        app.set('views', __dirname + '/views');
        app.engine('html', enginesApp.nunjucks);
        app.use(bodyParserApp.urlencoded({ extended: true })); 
        
        
        // Handler for internal server errors
        function errorHandler(err, req, res, next) {
            console.error(err.message);
            console.error(err.stack);
            res.status(500).render('error_template', { error: err });
        }
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
        }
        /**
         * Accepts a day of the week.
         * 
         * Returns an array containing the day's schedule as follows:
         * 
         * 0: Product Descriptions.
         * 
         * 1: Product Values.
         * 
         * 2: Parsed product names.
         * 
         * 3: A summary {object} of the parseable elements of the schedule.
         * 
         * 4: the uppercase string day of week of the schedule returned.
         * @param {!number} dow 
         * should be in the format of the result of:
         * 
         * dow = new Date.Day( ); 
         * 
         * @returns {array} 
         */
        function getScheduleFromExcel(dow){
            var dowA = ['SUNDAY','MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY','SATURDAY'];//these are used as the excel schedule's workbook sheet names.
            switch(dow){
                case 0://SUNDAY
                    //spend this time well!
                break;
                case 6://SATURDAY
                    console.log("enjoy your weekend!");
                break;
                default:
                    var dowToday = dowA[dow];//this is used to get the workbook sheet names.
                    //console.log(dowToday);
            }
            var arrayArray = [[],[]];//[]
            if(dowToday.length<3){
                throw `Error: this should be something like: MONDAY instead of ${dowToday}`;
            }
            if(typeof require !== 'undefined') XLSX = require('xlsx');
            var fileString = "";
            if(process.env.SYSTEM == 'local'){
                fileString = '\\\\OFS1\\SHARED\\USERS\\SHARED\\Chairs Powder Coating\\PC SCHEDULE 2018.xlsx';
            }
            else{
                fileString = pathApp.resolve(__dirname + "/public/sample/sampleSchedule.xlsx");
            }
            
            var workbook = XLSX.readFile(fileString);
            
            
            
            /* DO SOMETHING WITH workbook HERE */
            var first_sheet_name = workbook.SheetNames[0];
            var address_of_cell = 'G3';
             
            /* Get worksheet */
            var ws = workbook.Sheets[dowToday];
             
            /* Find desired cell */
            var desired_cell = ws[address_of_cell];
            var desired_range;
            //console.log(ws['!ref']);
            /* Get the value */

            var desired_value = (desired_cell ? desired_cell.v : undefined);
            var sheet2arr = function(sheet, range2Arr){
                var result = [];
                var row;
                var rowNum;
                var colNum;
                var range = XLSX.utils.decode_range(range2Arr);
                for(rowNum = range.s.r; rowNum <= range.e.r; rowNum++){
                   row = [];
                    for(colNum=range.s.c; colNum<=range.e.c; colNum++){
                       var nextCell = sheet[
                          XLSX.utils.encode_cell({r: rowNum, c: colNum})
                       ];
                       if( typeof nextCell === 'undefined' ){
                          row.push(void 0);
                       } else row.push(nextCell.w);
                    }
                    result.push(row);
                }
                return result;
                
            };
            var pA = 0;
            var vA = 1;
            
            arrayArray[vA] = sheet2arr(ws,'G3:G12');
            arrayArray[pA] = sheet2arr(ws,'F3:F12');
            
            var regExp = /(^En)\w+\s(A)\w+|(^En)\w+(?!\sArch)|(^Ek)\w+|(^Eon)|(^Elite)|(^Gr)\w+.*\d+|(CLASSIC STACKING CHAIR Square)|(CLASSIC STACKING CHAIR CROWN)|(CLASSIC STACKING CHAIR HOURGLASS)|(CLASSIC STACKING CHAIR OVAL)/gim;
            var parsedArray=[];
            var parsedValue;
            var importantArrayVals = [];
            //console.log(arrayArray[pA][0][0]);
            var i=0;
            for(var key in arrayArray[pA]){
                try
                {
                    if(arrayArray[pA][key][0]!=null){
                        parsedValue = arrayArray[pA][key][0].match(regExp);
                        
                        if(parsedValue!=null){
                            if(parsedValue[0].length>=8 && parsedValue[0].substring(0,8)=="Encore A" ){
                                parsedValue="Encore Arch";
                            }
                            else if(parsedValue[0].substring(0,2)=="Eo"){
                                parsedValue="Eon";
                            }
                            else if(parsedValue[0].substring(0,2)=="El"){
                                parsedValue="Elite";
                            }
                            else if(parsedValue[0].substring(0,1)=="E"){
                                parsedValue="Encore";
                            }
                            else if(parsedValue[0].substring(0,1)=="G"){
                                
                                parsedValue="G"+parsedValue[0].substring(parsedValue[0].length-1);
                            }
                            else if(parsedValue[0].substring(23,29)=="SQUARE"){
                                
                                parsedValue="Square";
                            }
                            else if(parsedValue[0].substring(23,28)=="CROWN"){
                                
                                parsedValue="Crown";
                            }
                            else if(parsedValue[0].substring(23,27)=="OVAL"){
                                
                                parsedValue="Oval";
                            }
                            else if(parsedValue[0].substring(23,34)=="HOURGLASS"){
                                
                                parsedValue="Hourglass";
                            }
                            importantArrayVals.push(i);
                        }
                        else{
                        
                        }
                        parsedArray.push("");
                        parsedArray[i]=parsedValue||'NoMatchingRegex';
                    }
                    else{
                        parsedArray.push('N/A');
                    }
                    
                }
                catch(e){
                    //console.log(e);
                    parsedArray.push('BadLine');
                }
                i++;
            }
            //console.log(parsedArray);
            //console.log(importantArrayVals);
            var importantObject = {};
            for(i in importantArrayVals){
                var ii = importantArrayVals[i];
                //console.log(ii);
                //console.log("pA[ii]:",arrayArray[pA][ii]);
                //console.log("parsedArray[ii]:",parsedArray[ii]);
                
                
                //Without the <ii + " " + > line in there this will break on duplicate key names, keeping only the last.
                importantObject[ii + " " + parsedArray[ii]]={};
                importantObject[ii + " " + parsedArray[ii]]['description']=arrayArray[pA][ii][0];// jshint ignore:line
                importantObject[ii + " " + parsedArray[ii]]['qty']=arrayArray[vA][ii][0];// jshint ignore:line
            }
            arrayArray.push(parsedArray);
            arrayArray.push(importantObject);
            arrayArray.push(dowToday);
            return arrayArray;
        }
        app.use(errorHandler);

        app.get('/helloWorld', function(req,res, next){
            res.send("Hello World");
        });
        app.get('/', function(req,res,next){
            var arduinoArray = ["Comfort Framing"];
            serverApp.aggregateProductNames((productArray)=>{
                //console.log(productArray);
                
                res.render('home',{productArray:productArray, arduinoArray:arduinoArray});
                
            });
            
        });
        app.get('/view_dataPoint', function(req,res,next){
            res.render('viewData');
        });
        app.post('/view_dataPoint', function(req, res, next) {
            var sensor = req.body.sensor.toString();
            var query1 = new Date(req.body.query1);
            //console.log(query1);
            var query2 = new Date(req.body.query2);
            //console.log(query2);
            
            const Sensor = {
                sensor:sensor,
            };
            Sensor.limit = parseInt(req.body.limit,10) || 20;
            //var time = momentApp.utc(new Date()).format("YYYY-MM-DD HH:mm Z");
            //console.log(time);

            var iSensor = {
                sensor:sensor
            };
            var sensorArray = [];
            serverApp.mongoDataGrabSensorArray(Sensor, callback2);
            function callback2(cursor){
                var count = 0;
                cursor.forEach(sensor => {
                    count=count+1;
                    sensor.time= momentApp(new Date(sensor.time), "YYYY-MM-DD HH:mm Z");
                    sensorArray.push(sensor);
                    //console.log(sensor);
                },function(err){
                    console.log("Retrieved: ", count,Sensor.sensor+" sensors");
                    
                    var docs = sensorArray;
                    res.render('sensor.html', { 'points' : docs});
                });
            }
            
        }); 
        app.get('/add_dataPoint', function(req,res,next){
            res.render('add_dataPoint', {'randomInt':getRandomInt(0,5500)});
        });
        app.post('/add_dataPoint', function(req, res, next) {
            var sensor = req.body.sensor.toString();
            var value = req.body.value;
            const Sensor = {
                sensor:sensor,
            };
            Sensor.limit = parseInt(req.body.limit,10) || 20;
            var time = momentApp.utc(new Date()).format("YYYY-MM-DD HH:mm Z");
            //console.log(time);

            var iSensor = {
                sensor:sensor,
                value:value,
                time:time
            };
            serverApp.insertSensor(iSensor,callback);
            function callback(){
                serverApp.mongoDataGrabSensorArray(Sensor, callback2);
            }
            var sensorArray = [];
            function callback2(cursor){
                var count = 0;
                cursor.forEach(sensor => {
                    count=count+1;
                    sensor.time= momentApp(new Date(sensor.time), "YYYY-MM-DD HH:mm Z");
                    sensorArray.push(sensor);
                    //console.log(sensor);
                },function(err){
                    console.log("Retrieved: ", count,Sensor.sensor+" sensors");
                    
                    var docs = sensorArray;
                    res.render('sensor.html', { 'points' : docs, 'value': value});
                });
            }
            
        }); 
       
        app.get('/public/scripts/DrawLineGraph.js',function(req,res,next){
            console.log("sent JS file.");
            res.sendFile(pathApp.resolve(__dirname + "/public/scripts/DrawLineGraph.js"));
            
        });
        app.get('/public/scripts/example.js',function(req,res,next){
            console.log("sent JS file.");
            res.sendFile(pathApp.resolve(__dirname + "/public/scripts/example.js"));
            
        });
        app.get('/schedule',function(req, res, next){
            var date = momentApp(new Date());
            var dow = parseInt(req.query.dow) || 
                        date.day();//since dow is never going to be 0 (sunday) this works,
                        // but if I wanted to use sunday I'd have to re-think this logic.
            //console.log(dow);
            

            var schedule = getScheduleFromExcel(dow);
            var pA = schedule[0];
            var vA = schedule[1];
            var parsedArray = schedule[2];
            var importantObject = schedule[3];
            var dowToday = schedule[4];
            var orderArray = ['1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th'];
            var saved = false;
            serverApp.aggregateProductNames((productArray)=>{
            //console.log(importantObject);//todo this important Object needs to be saved to mongo.
            var scheduleToday =[];
            if(req.query.save){
                //console.log(parsedArray);
                for(var i in parsedArray ){
                    
                    //console.log(vA[i][0]);
                    scheduleToday[i]={
                        [i] : { [parsedArray[i]]:parseInt(vA[i][0]) }
                    };
                }
                //console.log(scheduleToday);
                let offset = date.day()-dow;
                let mongoScheduleObject = {date:new Date(date.year(), date.month(), date.date()-offset), scheduleToday};
                serverApp.insertSchedule(mongoScheduleObject,function(result){
                    //console.log("Schedule Inserted.", result.insertedCount);
                });
                saved = true;
            }
                res.render('schedule',
                {
                    orderArray:orderArray,
                    productArray:productArray,
                    pA:pA, 
                    valueArray:vA, 
                    sdow:dowToday,
                    dow:dow,
                    parsedArray:parsedArray,
                    summary:importantObject,
                    saved:saved,
                    scheduleToday:scheduleToday
                });
            });
        });

        app.get('/schedule_finished',function(req,res,next){
            var date = momentApp(new Date());
            var dow = parseInt(req.query.dow) || 
                        date.day();
            var schedule= getScheduleFromExcel(dow);

        });
        app.get('/product',function(req,res,next){
            console.log(req.query.productSelection);
            var productName = req.query.productSelection || "hourglass";
            productName = productName.toString();
            var product = {
                name:productName,
                partsPerHour:getRandomInt(0,80)+(1/getRandomInt(-80,80)),
                time: new Date(),
                limit:20
            };
            //serverApp.insertProduct(product,function(result){
                //console.log(result);
                serverApp.mongoDataGrabProductArray(product,function(result2){
                    var productArray=[];
                    var count=0;
                    result2.forEach(entry => {
                        count++;
                        productArray.push(entry);
                        //console.log(productArray);
                    },function(err){
                        console.log("Retrieved: ", count, product.name +" entries");
                        serverApp.aggregateProductPartsPerHour(productName, function(pphProduct){
                            
                            function round(value, decimals) {
                                return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
                              }
                            try {
                                //console.log(pphProduct[0].PPH);
                                res.render("product",
                                {product:product,productArray:productArray,pphProduct:round(pphProduct[0].PPH, 1)});
                            }                            
                            catch (e){
                                res.render("error_template",{error:e});
                            }
                        });
                    });
                });
            //});
        });


        app.get('/inProgress',function(req,res,next){
            
            var product = {
            //     limit:31
            };
            serverApp.mongoDataGrabInProgressArray(product,function(result2){
                var productArray=[];
                var count=0;
                result2.forEach(entry => {
                    count++;
                    productArray.push(entry);
                    
                },function(err){
                    try {
                        //console.log(pphProduct[0].PPH);
                        res.render("inProgress",
                        {productArray:productArray});
                        //console.log(productArray);
                    }                            
                    catch (e){
                        res.render("error_template",{error:e});
                    }
                });
                
            });
        });

        app.get('/partNumberGen',function(req, res, next){
            
            var RLO = req.query.rlo || 171317;
            RLO = parseInt(RLO);
            var productOffering = {
                productLine:{
                    "Comfort":{
                        "leg":'1232LegPartNum123',"front":'1232FrontPartNum123',"stack-bar":'1232StackBarPartNum123','seat-support':'1232SeatSupportPartNum123',
                        backShape:{"HG":40,"SQ":40,"RN":40,"OV":40,"CR":50,"GEN-CR":56},
                        backOption:["Flex","Fixed"],
                        options:["Arm","GA","Ret-GA"]
                    },
                    "Encore":{
                        "leg":1,"front":1,"stack-bar":1,'seat-support':1
                    },
                    "G2":{
                        "leg":1,"front":1,"stack-bar":1,'seat-support':1
                    },
                    "G6":{
                        "leg":1,"front":1,"stack-bar":1,'seat-support':1
                    },
                    "Eon":{
                        "leg":1,"front":1,"stack-bar":1,'seat-support':1
                    },
                    "A3":{
                        "leg":1,"front":1,"stack-bar":1,'seat-support':1
                    },
                    "Elite":{
                        "leg":1,"front":1,"stack-bar":1,'seat-support':1
                    }
                },
                
            };
            var part = {
                productLine:{"Comfort":{"leg":'109718',"front":'109716 or 109719',"stack-bar":'111231','seat-support':'111165'}},
                backShape:{"HG":'1098xx'},
                backOption:["Flex"],
                options:{"Arms":'xxxxxx',"Ret-GA":'xxxxxx'}
            };
            var partNumbers = {
                productLine:{
                    "Comfort":{
                        "leg":1,"front":1,"stack-bar":1,'seat-support':1
                    },
                    "Encore":{
                        "leg":1,"front":1,"stack-bar":1,'seat-support':1
                    },
                    "G2":{
                        "leg":1,"front":1,"stack-bar":1,'seat-support':1
                    },
                    "G6":{
                        "leg":1,"front":1,"stack-bar":1,'seat-support':1
                    },
                    "Eon":{
                        "leg":1,"front":1,"stack-bar":1,'seat-support':1
                    },
                    "A3":{
                        "leg":1,"front":1,"stack-bar":1,'seat-support':1
                    },
                    "Elite":{
                        "leg":1,"front":1,"stack-bar":1,'seat-support':1
                    }
                },
                backShape:{"HG":40,"SQ":40,"RN":40,"OV":40,"CR":50,"GEN-CR":56},
                backOption:"Flex",
                options:["Arm","Ret-GA"]
            };
            res.render('partNumberGen',{RLO:RLO,part:part});
        });

        app.get('/config', function(req,res,next){
            var arduinoName = req.query.arduinoSelection.toString();
            var topic = "To"+arduinoName;
            
            var product = {name:`Arduino Configuration: ${arduinoName}`};
            serverApp.mongoGetArduinoSettings(arduinoName,(settings)=>{
                console.log(topic, settings);
            });
            var updateSpot = "fallingEdge";
            var productArray = [
                {_id:"1", updateSpot:"n/a", risingEdge:5, fallingEdge:"n/a",  updatedTime:new Date("1/8/2018")},
                {_id:"2", updateSpot:"n/a", risingEdge:5, fallingEdge:"n/a",  updatedTime:new Date("1/9/2018")},
                {_id:"3", updateSpot:((updateSpot == "risingEdge") ? 95 : "n/a"), risingEdge:95, fallingEdge:95, updatedTime:new Date("1/9/2018")},
                {_id:"4", updateSpot:"n/a", risingEdge:"n/a", fallingEdge:95,  updatedTime:new Date("1/10/2018")},
                {_id:"5", updateSpot:((updateSpot == "fallingEdge") ? 5 : "n/a"), risingEdge:"n/a", fallingEdge:5, updatedTime:new Date("1/10/2018")},
                {_id:"6", updateSpot:"n/a", risingEdge:"n/a", fallingEdge:5,  updatedTime:new Date("1/11/2018")},
            ];
            res.render('arduinoConfig',
                {
                    product:product,
                    productArray:productArray
                });
        });
        callback(app);
        }
    }

module.exports = App;