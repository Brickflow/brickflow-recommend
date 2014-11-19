'use strict';
require('brickflow-common'); // initialize
var amqpConnection = require('brickflow-common/service/rabbitmq/connection');

var config = require('../config');
console.log('DAT ENV in RECOMMEND: ', config.get('ENVIRONMENT'));

var loggerConf = {
  logstash: {
    port: config.get('LOGSTASH_PORT'),
    nodeName: config.get('LOGSTASH_APP_NAME'),
    host: config.get('private:LOGSTASH_HOST')
  },
  amqp: {
    connection: amqpConnection
  }
};
console.log(loggerConf);

var metrics = require('brickflow-logger')(loggerConf);

require('./listen')({
  logger: metrics.createTracker('recommendRpc'),
  url: config.get('private:RABBITMQ_URL')
});
  