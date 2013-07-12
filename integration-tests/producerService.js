/* global describe: false */
/* global it: false */
/* global expect: false */
/* jshint maxstatements: 30 */
'use strict';

var Address = require('../lib/address');
var transport = require('../lib/Transport');
var SynapsePlasmaDecoration = require('../lib/Plasma.js');

module.exports = function Anne (plasma, config) {
  plasma = plasma.use(SynapsePlasmaDecoration);
  
  var ADDR = 'alabala';
  var dataOrganel = {
    message: function (d) {
      console.log('new organel messaged');
      plasma.emit(d);
    }
  };
    
  plasma.on(Address.EVENT, function (chemical, callback) {
    var address = chemical.address || '1';
    
    if (address === ADDR) {
      callback(transport.createInProcess(dataOrganel));
      return true;
    }
    
    return false;
  }.bind(this));
  
  plasma.on('system.start', function (chemical, sender, callback) {
    console.log('producer started');
    plasma.message(config.contacts.service, ADDR, function (d) {
      console.log('callback invoked');
      plasma.emit(d);
    });
  }.bind(this));
};