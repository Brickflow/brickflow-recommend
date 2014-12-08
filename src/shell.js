'use strict';
require('brickflow-common'); // initialize
var amqpConnection = require('brickflow-common/service/rabbitmq/connection');

var config = require('../config');
var metrics = require('brickflow-logger')({
  logstash: {
    port: config.get('LOGSTASH_PORT'),
    nodeName: config.get('LOGSTASH_APP_NAME'),
    host: config.get('private:LOGSTASH_HOST')
  },
  amqp: {
    connection: amqpConnection
  }
});

var User = require('brickflow-common/model/user');

var client = require('./client')({
  logger: metrics.createTracker('recommendRpc'),
  url: config.get('private:RABBITMQ_URL')
});

console.log('ARGV', process.argv);

setTimeout(function() {
  var args = [function(err) {
    if (err) {
      process.exit(1, err.code);
    } else {
      process.exit()
    }
  }];
  if (process.argv[3]) {
    args = process.argv.slice(3).concat(args);
    User.findOne({tumblrUsername: args[0]}, {
      tumblrUsername: 1,
      tumblrAccessToken: 1,
      tumblrSecret: 1}, function(err, user) {
      args[0] = user;
      client[process.argv[2]].apply(null, args);
    });
  }
}, 2000); // TODO FIXME