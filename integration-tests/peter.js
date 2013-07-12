/* global describe: false */
/* global it: false */
/* global expect: false */
/* jshint maxstatements: 30 */
'use strict';

module.exports = function Peter (plasma, config) {
    this.message = function (data) {
      console.log('peter dates ' + data);
      plasma.emit('will_visit_' + data);
    };
  
    plasma.on('system.start', function () {
      console.log('peter flirts');
      plasma.emit('call_me_maybe', config.address);
    });
};