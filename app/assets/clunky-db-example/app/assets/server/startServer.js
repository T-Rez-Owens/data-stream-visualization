'use strict'
const ServerConstructor = require('./Server');
let serverStarter;
serverStarter = new ServerConstructor;
serverStarter.startListening();