'use strict';

require('brickflow-common'); // initialize

require('./actions/register')({
  tumblrUsername: 'ifroz',
  tumblrAccessToken: 'SBn0tTR0oes6b8NhqktvLUJU1LsJs2KE2L7eUsySQOxqaXXw1s',
  tumblrSecret: '6OY67hfHRHBV0xzepBXPLBWeAoAlpTfP09qLsJyOHIm1fpeSxK'
}, function() {
  console.log('ARGS LOGGED:', arguments);
  process.exit(0);
});