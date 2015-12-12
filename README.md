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
  
**What Roond will generate**:

    (function() {
  
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
