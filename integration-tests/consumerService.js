/* global describe: false */
/* global it: false */
/* global expect: false */
/* jshint maxstatements: 30 */
'use strict';

var SynapsePlasmaDecoration = require('../lib/Plasma.js');

module.exports = function Jack (plasma, config) {
  plasma = plasma.use(SynapsePlasmaDecoration);
  this.message = function (addr, callback) {
    console.log('consumer recieved address: ', addr);
    plasma.message(addr, 'success');
    callback('finished');
  };
};