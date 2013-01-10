var organic = require("organic");
var Nucleus = require("./Nucleus");
var Plasma = require("./Plasma");

module.exports = function Cell(dna){
  var core = {
    "Nucleus":Nucleus,
    "Plasma":Plasma
  };
  return organic.Cell.call(this, dna, core);
}

