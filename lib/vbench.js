
/*!
 * vbench
 * Copyright(c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var uubench = require('uubench')
  , Canvas = require('canvas');

/**
 * Library version.
 */

exports.version = '0.0.1';

exports.createSuite = function(options){
  options = options || {};
  options.result = function(name, stats){
    var persec = 1000 / stats.elapsed
      , ops = stats.iterations * persec;
    console.log('%s: %d', name, ops | 0);
  };
  return new uubench.Suite(options);
};