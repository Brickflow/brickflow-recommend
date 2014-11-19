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

//require('./listen')({
//  logger: metrics.createTracker('recommendRpc'),
//  url: config.get('private:RABBITMQ_URL')
//});

var client = require('./client')({
  logger: metrics.createTracker('recommendRpc'),
  url: config.get('private:RABBITMQ_URL')
});

setTimeout(function() {
  console.log('DATS HAPPENING');
  client.register({
//  client.updateYourCache({
    tumblrUsername: 'ifroz',
    hash: '12312312312312331233212131232312123',
    tumblrAccessToken: 'SBn0tTR0oes6b8NhqktvLUJU1LsJs2KE2L7eUsySQOxqaXXw1s',
    tumblrSecret: '6OY67hfHRHBV0xzepBXPLBWeAoAlpTfP09qLsJyOHIm1fpeSxK'
    }, function(err,res) {
    console.log('MEGBASZATTAM A FEEDET');
    console.dir(arguments);
  });
//  client.updateTrendingCache(function() { console.log('RETURND', arguments); });
}, 2000);