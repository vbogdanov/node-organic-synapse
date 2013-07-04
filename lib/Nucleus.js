var organic = require("organic");
var transport = require("./Transport");
var Address = require("./address");

module.exports = function Nucleus(plasma, dna){
  organic.Nucleus.call(this, plasma, dna);
  
  var self = this;
  self.organellesMap = Object.create(null);
  var superBuildOne = self.buildOne;
  
  self.buildOne = function(c, callback) {
    superBuildOne.call(self, c, function (instance) {
      if(typeof c.address !== "undefined") {
        self.organellesMap[c.address] = { "instance": instance };
      }
      if (typeof callback === 'function')
        callback(instance);
    });
  }
  
  plasma.on(Address.EVENT, function (chemical, callback) {
    var address = chemical.address || "1";
    if (typeof address !== "string" || address === "__proto__" /* add other safe conditions here or handle the organellesMap better */)
      return false;
    var organel = this.organellesMap[chemical.address];
    if (organel) {
      callback(transport.createInProcess(organel.instance));
      return true;
    }
    return false;
  }.bind(this));
}

module.exports.prototype = organic.Nucleus.prototype;
