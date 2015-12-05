exports.functionExists = functionExists;
exports.getFunctionBody = getFunctionBody;
exports.getFunctionParameters = getFunctionParameters;

function functionExists(name) {
  console.log('typeof ' + name + ' == ' + eval("typeof " + name));

  return eval("typeof " + name + " === 'function'");
}

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
