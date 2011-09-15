
/*!
 * vbench
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var uubench = require('uubench')
  , Canvas = require('canvas')
  , fs = require('fs');

/**
 * Library version.
 */

exports.version = '0.0.1';

exports.createSuite = function(options){
  var options = options || {}
    , path = options.path || 'out.png'
    , size = options.size || 300
    , canvas = new Canvas(size, size)
    , data = {};

  options.start = function(){
    console.log();
  };

  options.result = function(name, stats){
    var persec = 1000 / stats.elapsed
      , ops = stats.iterations * persec;
    console.log('  %s: %d', name, ops | 0);
    data[name] = ops | 0;
  };

  options.done = function(){
    render(canvas, data);
    fs.writeFile(path, canvas.toBuffer());
    console.log();
  };

  return new uubench.Suite(options);
};

function render(canvas, data) {
  var ctx = canvas.getContext('2d');
}