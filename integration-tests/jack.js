/* global describe: false */
/* global it: false */
/* global expect: false */
/* jshint maxstatements: 30 */
'use strict';

module.exports = function Jack (plasma, config) {
    this.message = function (data) {
      console.log('jack is told', data);
      if (data === 'happy_hunting')
        plasma.emit('out_of_town');
    };
};