'use strict';
module.exports = function(type, user, cb) {
  var feed;
  try {
    feed = require('brickflow-common/feed/' + type + 'Cache');
    feed.updateNow.apply(null, Array.prototype.slice.call(arguments, 1));
  } catch (err) {
    console.log('ERRORKA: ', err);
  }
};