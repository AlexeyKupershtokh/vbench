
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
    , size = options.size || 600
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
    var keys = Object.keys(data);
    var canvas = new Canvas(size, keys.length * size / 3);
    render(canvas, data);
    fs.writeFile(path, canvas.toBuffer());
    console.log();
  };

  return new uubench.Suite(options);
};

function max(data) {
  return Object.keys(data).reduce(function(max, key){
    return data[key] > max ? data[key] : max;
  }, 0);
}

function render(canvas, data) {
  var ctx = canvas.getContext('2d')
    , keys = Object.keys(data)
    , w = canvas.width
    , h = canvas.height
    , maxOps = max(data)
    , pad = 30;

  // ops/s labels
  ctx.font = exports.colors['chart.label.font'];
  ctx.fillStyle = exports.colors['chart.label.color'];
  var n = 5
    , step = w / n;
  for (var i = 0; i < n; ++i) {
    var str = i + 10000
      , width = ctx.measureText(str).width
      , em = ctx.measureText('M').width;
    ctx.fillText(str, width / 2, i * step);
  }

  // border
  ctx.strokeStyle = exports.colors['chart.border'];
  ctx.strokeRect(pad + width + .5, pad + .5, w - pad * 2 - width, h - pad * 2);

  // background
  ctx.fillStyle = exports.colors['chart.background'];
  ctx.fillRect(pad + width + 2, pad + 2, w - pad * 2 - 3 - width, h - pad * 2 - 3);


}