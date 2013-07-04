var SynapsePlasmaDecoration = require("../lib/Plasma");

module.exports = function Anne (_plasma, config) {
    var plasma = _plasma.use(SynapsePlasmaDecoration);
    plasma.on("call_me_maybe", function (msg, lover_address, useless) {
      console.log("anne flirts");
      plasma.on("out_of_town", function () {
        console.log("anne cheats with " + lover_address);
        plasma.message(lover_address, config.address);
      });
      
      console.log("anne sends jack away:");
      plasma.message(config.contacts.husband, "happy_hunting");
    });
}