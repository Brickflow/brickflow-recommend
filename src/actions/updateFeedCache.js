'use strict';

module.exports = function(type, user, cb, raw) {
  require('brickflow-common/feed/' + type + 'Cache').
      apply(Array.prototype.slice.call(arguments));
};