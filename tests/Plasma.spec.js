/* global describe: false */
/* global it: false */
/* global expect: false */
/* jshint maxstatements: 30 */
'use strict';

 var Gateway = require('../lib/Gateway');
 var transport = require('../lib/Transport');
 var Address = require('../lib/address');
 var Plasma = require('organic').Plasma;
 var PlasmaDecorator = require('../lib/Plasma');
 var transportMock = transport.interface; 
 
 describe('Plasma', function(){
  it('creates an instance of Gateway using new Gateway(address, plasma) and does obtains transport', function(next){
    var address = 'targetAddressIsString';
    var plasma = new Plasma().use(PlasmaDecorator);
        
        //simulate address resolved:
    plasma.on(Address.EVENT, function (chemical, callback) {
          callback(transportMock);
        });

        
    expect(function () {
          plasma.createGateway(address, function (gate) {
            expect(gate instanceof Gateway).toBe(true);
            next();
          });
        }).not.toThrow(); 
  });
  
});
