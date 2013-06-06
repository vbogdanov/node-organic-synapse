var uber = require("organic").Plasma;
var Gateway = require("./Gateway");
var util = require("util");

module.exports = function Plasma(){
  uber.call(this);
  addresses = Object.create(null); //should be map
  
  this.on("system.OrganelRelease", function (data) {
    delete addresses[data.address];
    return false; //always continue on
  });
 
  this.message = function (recipients, message, callback) {
    var i;
    
    if (!Array.isArray(recipients)) {
      recipients = [recipients];
    }
    
    for (i = 0; i < recipients.length; i++) {
      addr = recipients[i];
      var transport = addresses[addr];
      if (! transport) {
        transport = new Gateway(addr, this);
        addresses[addr] = transport;
      }
      transport && transport.send(message, callback);
    }
  }.bind(this);
  
  this.createGateway = function (addr, callback) {
    var g = addresses[addr] || new Gateway(addr, this);
    g.obtainTransport(callback);
    return g;
  }
}
util.inherits(module.exports, uber);