'use strict';

module.exports = function(type, user, cb) {
  console.log('UPDATE DAT FEED CACHE', type);
  require('brickflow-common/feed/' + type + 'Cache').update.
      apply(null, Array.prototype.slice.call(null, arguments, 1));
  console.log('FOSKAZAL VAGYOK');
};