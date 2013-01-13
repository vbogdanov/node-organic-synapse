var organic = require("organic");
var transport = require("./Transport");
var Address = require("./address");

module.exports = function Nucleus(dna, plasma){
  organic.Nucleus.apply(this, arguments);
  plasma.on(Address.EVENT, function (chemical, sender, callback) {
    var address = chemical.address || "1";
    if (typeof address !== "string" || address === "__proto__" /* add other safe conditions here or handle the organellesMap better */)
      return false;
    var organel = this.organellesMap[chemical.address];
    if (organel) {
      chemical.callback(transport.createInProcess(organel.instance));
      return true;
    }
    return false;
  }.bind(this));
}

module.exports.prototype = organic.Nucleus.prototype;
