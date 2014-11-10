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
    url: options.url
  });
  rpc.on(options.queueName, function(task, cb) {
    var dt = measure.time('recommend-rpc');
    options.logger(options.queueName + 'api-call', {
      action: task.action
    });
    require('./actions/' + task.action).apply(
        null, task.params.concat([function(err, res) {
      (cb || _.noop)(err, res);
      options.logger[err ? 'error' : 'info'](options.queueName + '-api-response', {
        action: task.action,
        // params: task.params,
        doneAt: new Date(),
        running: dt.count('recommend-rpc'),
        queryDuration: dt.end(),
        hasCb: !!cb
      });
    }]));
  });
};