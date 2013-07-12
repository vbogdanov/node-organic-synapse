'use strict';
/**
 * Tranport is a connection to an object that provides message(chemical) method. Usually this object is going to be an Organel
 * This module provides the interface and inner process communication implementation.
 */
module.exports = {};
module.exports.interface = {
  send: function (chemical, callback) {},
  onError: function (error) {}
};

module.exports.createInProcess = function (directRef, plasma) {
  return {
    send: function (chemical, callback) { 
      if (directRef !== null) {
        directRef.message(chemical, callback);
      } else {
        this.handleError({'message': 'transport closed', 'type': 'TransportClosed'}); 
      }
    },
    onError: function (error) {
      /* default implementation. Gateway should replace this method */
      console.log(error);
    }
  };
};
