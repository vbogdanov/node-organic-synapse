/* global describe: false */
/* global it: false */
/* global expect: false */
/* jshint maxstatements: 30 */
'use strict';
/**
 * Test Transport.createInProcessTransport(ref)
 */
 
 var Transport = require('../lib/Transport'); 
 var Address = require('../lib/address');
 
 describe('Transport', function(){
   var fakePlasma = { 'emit': function () {} };
 
  it('should return an object that provides send method as described in the interface', function(){
    var target = {};
    
    var transport = null;
    expect(function () {
      transport = Transport.createInProcess(target, fakePlasma);
    }).not.toThrow(); 
    
    expect(transport).toBeTruthy();
    expect(typeof transport.send).toBe('function');
  });
  
  it('should invoke the message(chem) method of the target when send is invoked', function (next) {
    var chemical = { 'success': true };
    var target = {
      'message': function (chem) {
         expect(chem).toEqual(chemical);
        next();
      }
    };
    expect(function () {
      var transport = Transport.createInProcess(target, fakePlasma);
      transport.send(chemical);
    }).not.toThrow();
  });
  
  it('should invoke the message(chem, callback) method of the target when send is invoked', function (next) {
    var chemical = { 'success': true };
    var target = {
      'message': function (chem, callback) {
        expect(chem).toEqual(chemical);
        callback();
      }
    };
    expect(function () {
      var transport = Transport.createInProcess(target, fakePlasma);
      transport.send(chemical, next);
    }).not.toThrow();
  });
});