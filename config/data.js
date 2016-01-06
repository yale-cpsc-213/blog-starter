'use strict';
var glob = require('glob');

module.exports = function() {
  var files = glob.sync('../**/*.yaml');
  console.log('files =', files);
}
