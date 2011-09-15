
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
  , color = require('./color')
  , fs = require('fs');

/**
 * Library version.
 */

exports.version = '0.0.1';

exports.colors = {
    'chart.background': '#e8eef6'
  , 'chart.data': '#8da7d2'
  , 'chart.border': '#eee'
  , 'chart.label.font': '12px Helvetica'
  , 'chart.label.color': '#888'
};

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
  var ctx = canvas.getContext('2d')
    , w = canvas.width
    , h = canvas.height
    , pad = 30;

  // border
  ctx.strokeStyle = exports.colors['chart.border'];
  ctx.strokeRect(pad + .5, pad + .5, w - pad * 2, h - pad * 2);

  // background
  ctx.fillStyle = exports.colors['chart.background'];
  ctx.fillRect(pad + 2, pad + 2, w - pad * 2 - 3, h - pad * 2 - 3);

  // labels
  ctx.font = exports.colors['chart.label.font'];
  ctx.fillStyle = exports.colors['chart.label.color'];
  ctx.fillText('ops/s', w / 2, h - pad / 2);
}