var Address = require("../lib/address");
var transport = require("../lib/Transport");

module.exports = function Anne (plasma, config) {
  
  var ADDR = "alabala";
  var dataOrganel = {
    message: function (d) {
      console.log("new organel messaged");
      plasma.emit(d);
    }
  }
    
  plasma.on(Address.EVENT, function (chemical, sender, callback) {
    var address = chemical.address || "1";
    
    if (address === ADDR) {
      chemical.callback(transport.createInProcess(dataOrganel));
      return true;
    }
    
    return false;
  }.bind(this));
  
  plasma.on("system.start", function (chemical, sender, callback) {
    console.log("producer started");
    plasma.message(config.contacts.service, ADDR);
  }.bind(this));
}