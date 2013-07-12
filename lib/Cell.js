'use strict';

var organic = require('organic');
var Nucleus = require('./Nucleus');
var Plasma = require('./Plasma');

module.exports = function Cell(dna){
  var core = {
    'Nucleus':Nucleus
  };
  return organic.Cell.call(this, dna, core);
};

