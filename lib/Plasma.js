var uber = require("organic").Plasma;
var Gateway = require("./Gateway");

module.exports = function Plasma(){
  uber.call(this);
  addresses = Object.create(null); //should be map
  
  this.on("system.OrganelRelease", function (data) {
    delete addresses[data.address];
    return false; //always continue on
  });
 
  this.message = function (recipients, message) {
    var i;
    
    if (!Array.isArray(recipients)) {
      recipients = [recipients];
    }
    
    for (i = 0; i < recipients.length; i++) {
      addr = recipients[i];
      var transport = addresses[addr];
      if (! transport)
        transport = new Gateway(addr, this);
      transport && transport.send(message);
    }
  }.bind(this);
}

module.exports.prototype = uber.prototype;