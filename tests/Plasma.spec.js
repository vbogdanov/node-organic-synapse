/**
 * Test Gateway
 */
 
 var Gateway = require("../lib/Gateway");
 var transport = require("../lib/Transport");
 var Address = require("../lib/address");
 var Plasma = require("../lib/Plasma");
 var transportMock = transport.interface; 
 
 describe("Plasma", function(){
  it("creates an instance of Gateway using new Gateway(address, plasma) and does obtains transport", function(next){
  	var address = "targetAddressIsString";
  	var plasma = new Plasma();
        
        //simulate address resolved:
  	plasma.on(Address.EVENT, function (chemical, null, callback) {
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
