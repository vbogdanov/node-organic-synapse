var Gateway = require("./Gateway");

module.exports = function PlasmaSynapseDecorator(state){
  state.addresses = state.addresses || Object.create(null);
  state.isDieListenerRegistered = state.isDieListenerRegistered || false;
  
  if (!state.isDieListenerRegistered) {
    this.on("system.OrganelRelease", function (data) {
      delete addresses[data.address];
      return false; //always continue on
    });
    
    state.isDieListenerRegistered  = true;
  }
  
  this.message = function (recipients, message, callback) {
    var i;
    
    if (!Array.isArray(recipients)) {
      recipients = [recipients];
    }
    
    for (i = 0; i < recipients.length; i++) {
      addr = recipients[i];
      var transport = state.addresses[addr];
      if (! transport) {
        transport = new Gateway(addr, this);
        state.addresses[addr] = transport;
      }
      transport && transport.send(message, callback);
    }
  }.bind(this);
  
  this.createGateway = function (addr, callback) {
    var g = state.addresses[addr] || new Gateway(addr, this);
    g.obtainTransport(callback);
    return g;
  }
}
