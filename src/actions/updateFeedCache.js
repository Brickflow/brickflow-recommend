'use strict';

module.exports = function(type, user, cb) {
  console.log('UPDATE DAT FEED CACHE', type);
  require('brickflow-common/feed/' + type).
      apply(Array.prototype.slice.call(null, arguments, 1));
};