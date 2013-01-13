var Cell = require("../lib/Cell.js")
, dna = require("./DNA.json");

describe("Communication", function(){
  it("allows for public broadcasts through the plasma or private messages toward specified address(es)", function(next){
    var cell = new Cell(dna);
    
    cell.plasma.on("will_visit_sexy@jackhouse.com", function () {
      next(); //success
    });
    
    cell.plasma.emit("system.start");
  });
});