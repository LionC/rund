#! /usr/bin/env node

var fs = require('fs');
var stream = require('stream');

var templates = {
  root: {
    template: [
      "(function() {",
      "",
      "    angular.module('$MODULE')",
      "    $COMPONENT",
      "    $CONFIG",
      "    $RUN",
      "",
      "})();"
    ].join('\n'),
    build: function(parts) {
      var ret = "(function() {\n\n    angular.module('" + parts.module + "')\n";
      ret += parts.component + "\n";

      return ret;
    }
  }
}

var transpilers = {
  service: function serviceTranspiler(componentFunc) {
    var injects = getFunctionParameters(componentFunc);

    var ret = [
      "(function(){",
      "",
      "angular.module('" + _module + "')",
      ".service([",
      injects.map(function(inject) { return "    '" + inject + "'," }).join("\n"),
      "    " + componentName,
      "])",
      "",
      "function " + componentName + "(" + injects.join(", ") + ") {" + getFunctionBody(componentFunc) + "}",
      "",
      "})();"
    ].join('\n');

    return ret;
  },
  factory: function factoryTranspiler(componentFunc) {
    var injects = getFunctionParameters(componentFunc);

    var ret = [
      "(function(){",
      "",
      "angular.module('" + _module + "')",
      ".factory([",
      injects.map(function(inject) { return "    '" + inject + "'," }).join("\n"),
      "    " + componentName,
      "])",
      "",
      "function " + componentName + "(" + injects.join(", ") + ") {" + getFunctionBody(componentFunc) + "}",
      "",
      "})();"
    ].join('\n');

    return ret;
  },
  controller: function controllerTranspiler(componentFunc) {
    var injects = getFunctionParameters(componentFunc);

    var ret = [
      "(function(){",
      "",
      "angular.module('" + _module + "')",
      ".controller([",
      injects.map(function(inject) { return "    '" + inject + "'," }).join("\n"),
      "    " + componentName,
      "])",
      "",
      "function " + componentName + "(" + injects.join(", ") + ") {" + getFunctionBody(componentFunc) + "}",
      "",
      "})();"
    ].join('\n');

    return ret;
  }
}

var fileName = process.argv[2];
var componentName = fileName.substr(0, fileName.lastIndexOf('.'));

var content = fs.readFileSync(fileName, {encoding: 'utf-8'});

eval(content);

if(_module == undefined) {
  console.error('Missing module declaration in ' + fileName + '- A rund file must define a _module variable containing the module name');
}

var componentFunction = null;
var transpiler = null;

var possibleComponents = [
  {
    postfix: 'Service',
    transpiler: transpilers.service
  },
  {
    postfix: 'Controller',
    transpiler: transpilers.controller
  },
  {
    postfix: 'Factory',
    transpiler: transpilers.factory
  }
];

for(var i = 0; i < possibleComponents.length; i++) {
  var functionName = componentName + possibleComponents[i].postfix;

  if(functionExists(functionName)) {
    componentFunction = eval(functionName);
    transpiler = possibleComponents[i].transpiler;

    break;
  }
}

if(componentFunction == null) {
  console.error('Could not find a component function in ' + fileName);
  //exit
}

console.log(transpiler(componentFunction));

function getFunctionBody(func) {
  var funcString = func.toString();

  return funcString.slice(funcString.indexOf('{') + 1, funcString.lastIndexOf('}'));
}

function getFunctionParameters(func) {
  var commentPattern = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
  var argumentNamePattern = /([^\s,]+)/g;

  var functionWithoutComments = func.toString().replace(commentPattern, '');
  var result = functionWithoutComments.slice(functionWithoutComments.indexOf('(')+1, functionWithoutComments.indexOf(')')).match(argumentNamePattern);

  if(result === null)
     result = [];

  return result;
}

function functionExists(name) {
  return eval("typeof " + name + " === 'function'");
}
