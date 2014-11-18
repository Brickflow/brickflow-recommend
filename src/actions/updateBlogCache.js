'use strict';
var _ = require('lodash');
var updateFeedCache = require('./updateFeedCache');

module.exports = _.partial(updateFeedCache, 'blog');