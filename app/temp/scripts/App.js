/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var dataLength = 5;

var xPosOrigin = 0;
var yPosOrigin = 0;

var xPosDest = c.width / 10;
var yPosDest = c.height / 1.2;
var yOffset = -1;

ctx.textBaseline = "middle";
ctx.textAlign = "center";

ctx.moveTo(xPosOrigin, yPosOrigin);
ctx.lineTo(xPosDest, yPosDest);
drawText(xPosDest, yPosDest);
for (i = 0; i < dataLength; i++) {
    xPosDest = xPosDest * 2;
    yOffset = yOffset * -1;
    yPosDest = yPosDest - yPosDest / 2 * yOffset;
    drawText(xPosDest, yPosDest);
}
xPosDest = c.width / 10;
yPosDest = c.height / 1.2;
yOffset = -1;

for (var i = 0; i < dataLength; i++) {
    xPosDest = xPosDest * 2;
    yOffset = yOffset * -1;
    yPosDest = yPosDest - yPosDest / 2 * yOffset;
    createPath(xPosDest, yPosDest);
}
ctx.globalCompositeOperation = "destination-over";
ctx.stroke();

function createPath(destX, destY) {
    ctx.lineTo(destX, destY);
}

function drawText(destX, destY) {
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(destX - 35, destY - 20, 70, 20);
    ctx.fillStyle = "#3333ff";
    ctx.fillText("(" + round(destX, 1) + " , " + round(destY, 1) + ")", destX, destY - 10);
}

function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

/***/ })
/******/ ]);