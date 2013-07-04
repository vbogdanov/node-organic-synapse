var Cell = require("../lib/Cell.js")
, dna = {
  "membrane":{},
  "plasma":{
    "anne":{
      "source":"integration-tests/anne",
      "address":"sexy@jackhouse.com",
      "contacts":{
        "husband":"jack@jackhouse.com"
      }
    },
    "jack":{
      "source":"integration-tests/jack",
      "address":"jack@jackhouse.com"
    },
    "peter":{
      "source":"integration-tests/peter",
      "address":"trouble@everywhere.com"
    }
  },
  "nucleus":{}
};

describe("Communication", function(){
  it("allows for public broadcasts through the plasma or private messages toward specified address(es)", function(next){
    var cell = new Cell(dna);
    
    cell.plasma.on("will_visit_sexy@jackhouse.com", function () {
      next(); //success
    });
    
    cell.plasma.emit({ 
      type:"build"
      , branch: "plasma"
    });
    cell.plasma.emit("system.start");
  });
});