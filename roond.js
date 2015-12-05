#! /usr/bin/env node

module.exports = roond;

var fnUtil = require('./functionUtil.js')

var serviceTranspiler = require('./transpilers/ServiceTranspiler.js');
var factoryTranspiler = require('./transpilers/FactoryTranspiler.js');
var controllerTranspiler = require('./transpilers/ControllerTranspiler.js');

var possibleComponents = [
  {
    postfix: 'Service',
    transpiler: serviceTranspiler
  },
  {
    postfix: 'Controller',
    transpiler: controllerTranspiler
  },
  {
    postfix: 'Factory',
    transpiler: factoryTranspiler
  }
];

function roond(content, fileBaseName) {
  var componentName = fileBaseName.substr(0, fileBaseName.lastIndexOf('.'));
  console.log('Component name detected: ' + componentName);

  eval(content);

  if(_module == undefined) {
    console.error('Missing module declaration in ' + fileBaseName + '- A rund file must define a _module variable containing the module name');
  }

  var componentFunction = null;
  var transpiler = null;

  for(var i = 0; i < possibleComponents.length; i++) {
    var functionName = componentName + possibleComponents[i].postfix;
    console.log('checking for ' + functionName);

    if(functionExists(functionName)) {
      componentFunction = eval(functionName);
      transpiler = possibleComponents[i].transpiler;

      break;
    }
  }

  if(componentFunction == null) {
    console.error('Could not find a component function in ' + fileBaseName);
    //exit
  }

  return transpiler(componentFunction, componentName);

  function functionExists(name) {
    return eval("typeof " + name + " === 'function'");
  }
}
