'use strict';

// Copy the files necessary for Firefox OS (configured with file-loader in
// webpack.config.js)
require('../manifest.webapp');
require('../images/icon128.png');
require('../images/icon512.png');

// Import the main stylesheet
require('styles/main.css');

// Require a JS dependency (just as an example)
var domify = require('domify');

// Kick off the app!
document.addEventListener('DOMContentLoaded', function () {
  document.body.appendChild(domify('<h1><%= appName %></h1>'));
});
