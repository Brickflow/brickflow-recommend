'use strict';
var _ = require('lodash'),
    async = require('async');
var InteractionCtr = require('brickflow-common/controller/interactionCtr'),
    asyncParseFollows = require('brickflow-common/service/tumblr/asyncParseFollows'),
    asyncParsePosts = require('brickflow-common/service/tumblr/asyncParsePosts');

  module.exports = function register(user, callback) {
    async.series({
      follows: _.partial(asyncParseFollows, user, function(follows, done) {
        InteractionCtr.bulkAdd(_.map(follows, function(follow) {
          return {
            action: 'follow.blog.initial',
            blogName: user.tumblrUsername,
            entityId: follow.name,
            createdAt: new Date
          };
        }), {}, _.noop);
        done();
      }),
      posts: _.partial(asyncParsePosts, user.tumblrUsername,
          { reblog_info: true }, function (posts, done) {
        InteractionCtr.bulkAdd(_.map(posts, function (post) {
          return {
            action: 'share.brick.initial',
            blogName: post.blog_name,
            entityId: 'tu' + post.id,
            hashtags: post.tags,
            originallyPostedBy: post.reblogged_root_name,
            createdAt: new Date
          };
        }));
        done();
      })
    }, callback);
};