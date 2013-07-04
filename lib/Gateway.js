var Chemical = require("organic").Chemical;
var Address = require("./address");
/**
 * Gateway is an object wrapping a target organel address. Gateways take care of obtaining and supporting Transports.
 * Transport is obtain lazily - after the first call to either emit or obtainTransport.
 * By default Gateways tries to obtain new transport if the current one fails.
 *
 *
 * new Gateway(address, plasma) - address is the address of the organel to send messages to,
 * 		plasma is the plasma of the current cell, it is required as part of the transport
 *		obtaining algorithm
 *
 * Gateway.emit(chemical) - pushes the chemical toward the address passed during creation. Emit does not guarantee that the message will be delivered.
 * Gateway.obtainTransport() - attempts to obtain Transport to the organel reffered to in address
 *  
 */
module.exports = function Gateway(address, plasma) {
  //defensive programming:
  if(!address || !plasma) {
  	throw { type:"IllegalArgumentException", "message": "Both address and plasma must be not null/undefined values" };
  }
  if (typeof address != "string") {
    throw { type:"IllegalArgumentException", "message": "address must be string" };
  }
  if (typeof plasma.emit != "function") {
  	throw { type:"IllegalArgumentException", "message": "plasma should be an object containing an emit method" };
  }
  
  //
  var States = { "NOT_INITIALIZED":0, "INITIALIZATION":1, "RUNNING":2 };
  var transportState = States.NOT_INITIALIZED;
  
  var transport = null;
  var chemicalsPool = [];
  
  this.send = function (chemical, callback) {
    if (transportState === States.RUNNING) {
      transport.send(chemical, callback);
    } else {
      chemicalsPool.push({ "chem": chemical, "cb": callback });
      this.obtainTransport();
    }
  };
  
  var This = this;
  var transportCreated = function (_transport) {
    transport = _transport;
    transport.onError = handleError;
    transportState = States.RUNNING;
    sendPooledMessages();
  };
  
  var sendPooledMessages = function () {
    var i
    , pool = chemicalsPool;
    chemicalsPool = [];
    for (i = 0; i < pool.length; i++) {
      var msg = pool[i];
      //in case transport fails
      This.send(msg.chem, msg.cb);
    }
  }
  
  var handleError = function (error) {
    //we should log it maybe?!
    obtainTransport();
  }
  var self = this;
  this.obtainTransport = function (cb) {
    cb = cb || function () {};
    if (transportState === States.NOT_INITIALIZED) {
      transport = null;
      transportState = States.INITIALIZATION;
      plasma.emit({ "type": Address.EVENT, "address": address }, function (_transport) { cb(self); transportCreated(_transport); });
    }
  };
  
};
