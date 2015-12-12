# Roond
Write better Angular with less code!

**CAUTION! Roond is still in development and NOT yet ready to be used!**

##What is Roond?

Roond lets you focus on the important part of your angular code by generating the redundant boilerplate 
code for you, automatically implementing a bunch of best practices during the process. This makes the files you 
work on shorter and thus easier to read and the resulting code consistently structured and well debugable.

Lets look at an example:

**The file you are writing**:

    _module = 'burgerbuilder';
    
    function TomatoFactory($resource, apiBase, tomatoEndpoint) {
        return $resource(apiBase + tomatoEndpoint);
    }
  
**What Roond will generate(with default options)**:

    (function() {
  
    'use strict';
  
    angular.module('burgerbuilder')
      .factory('Tomato', [
        '$resource',
        'apiBase',
        'tomatoEndpoint',
        TomatoFactory
      ]);
      
    function TomatoFactory($resource, apiBase, tomatoEndpoint) {
        return $resource(apiBase + tomatoEndpoint);
    }
    
    })();
    
You can see that there is no black magic happening. Roond simply wrote the Angular/Javascript best-practice boilerplate 
for you. Note that the Roond code is still legal javascript, so you do not need an editor plugin to use it.

##How to use

First, you need the npm package:

        npm install roond
        
If you want to use the Roond command line tool, add a `-g` to that command to install globally.

If you want to use Roond in your gulp build process, [use the official gulp plugin](https://github.com/LionC/gulp-roond).

Otherwise, use the Roond command line tool to convert files:

        roond inputFile.js outputFile.js
        
For a detailed documentation on the possible command line options type `man roond`
