var fnUtil = require('../functionUtil.js');

module.exports = factoryTranspiler;

function factoryTranspiler(componentFunc, componentName) {
  var injects = fnUtil.getFunctionParameters(componentFunc);

  var ret = [
    "angular.module('" + _module + "')",
    ".factory([",
    injects.map(function(inject) { return "    '" + inject + "'," }).join("\n"),
    "    " + componentName,
    "])",
    "",
    "function " + componentName + "(" + injects.join(", ") + ") {" + fnUtil.getFunctionBody(componentFunc) + "}",
  ].join('\n');

  return ret;
}
