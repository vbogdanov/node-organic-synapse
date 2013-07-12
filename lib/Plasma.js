'use strict';

var Gateway = require('./Gateway');

module.exports = function PlasmaSynapseDecorator(state){
  var self = this;
  state.addresses = state.addresses || Object.create(null);
  state.isDieListenerRegistered = state.isDieListenerRegistered || false;
  
  if (!state.isDieListenerRegistered) {
    self.on('system.OrganelRelease', function (data) {
      delete state.addresses[data.address];
      return false; //always continue on
    });
    
    state.isDieListenerRegistered  = true;
  }
  
  self.message = function (recipients, message, callback) {
    recipients = Array.isArray(recipients)?
        recipients : [recipients];
    
    for (var i = 0; i < recipients.length; i++) {
      var addr = recipients[i];
      var transport = state.addresses[addr];
      if (! transport) {
        transport = new Gateway(addr, self);
        state.addresses[addr] = transport;
      }
      if(transport) transport.send(message, callback);
    }
  };
  
  self.createGateway = function (addr, callback) {
    var g = state.addresses[addr] || new Gateway(addr, self);
    g.obtainTransport(callback);
    return g;
  };
};
