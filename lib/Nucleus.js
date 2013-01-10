var fs = require("fs");
var path = require("path");
var DNA = require("./DNA");
var util = require("util");
var organic = require("organic");
var transport = require("./Transport");
var Address = require("./address");

module.exports = function Nucleus(dna, plasma){
  organic.Nucleus.apply(this, arguments);
  plasma.on(Address.EVENT, function (chemical, sender, callback) {
    var address = chemical.address || "1";
    if (typeof address !== "string" || address === "__proto__" /* add other safe conditions here or handle the organellesMap better */)
      return false;
    var organel = organellesMap[chemical.address];
    if (organel) {
      callback(transport.createInProcess(organel));
      return true;
    }
    return false;
  });
}

