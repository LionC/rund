#! /usr/bin/env node

var fs = require('fs');
var path = require('path');

var roond = require('./roond.js');

/* ---------------ACTUAL EXECUTION----------------------- */
var fileContent = fs.readFileSync(process.argv[2], {encoding: 'utf-8'});

console.log(roond(fileContent, path.basename(process.argv[2])));
