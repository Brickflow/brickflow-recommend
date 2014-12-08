'use strict';
var _ = require('lodash');
var amqpRPC = require('amqp-rpc');

var dummyLogger = require('./utils/dummyLogger');
var measure = require('./utils/measure');

module.exports = function listen(options) {
  options = _.defaults(options || {}, {
    queueName: 'recommend-rpc',
    logger: dummyLogger,
    url: 'amqp://guest:guest@localhost:5672'
  });
  var rpc = amqpRPC.factory({
    url: options.url,
    exchange: 'recommend_rpc_exchange'
  });
  rpc.on(options.queueName, function(task, cb) {
    var dt = measure.time('recommend-rpc');
      options.logger.info((task.action === 'updateFeedCache') ?
          'recommend-' + task.params[0] + '-api-call' :
          options.queueName + '-api-call', {
      action: task.action,
      tumblrUsername: _.isString(task.params[1]) ? task.params[1] : undefined
    });
    require('./actions/' + task.action).apply(
        null, task.params.concat([function(err, res) {
      (cb || _.noop)(err, res);
      options.logger[err ? 'error' : 'info'](
          (task.action === 'updateFeedCache') ?
              'recommend-' + task.params[0] + '-api-response' :
              options.queueName + '-api-response', {
        action: task.action,
        tumblrUsername: _.isString(task.params[1]) ? task.params[1] : undefined,
        doneAt: new Date(),
        running: dt.count('recommend-rpc'),
        queryDuration: dt.end(),
        err: err,
        stack: err && err.stack,
        hasCb: !!cb
      });
    }]));
  } /* , null, { durable: true } */ );
};