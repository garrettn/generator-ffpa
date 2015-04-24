'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('ffpa:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .withOptions({ skipInstall: true })
      .withPrompts({
        appName: 'Test App',
        description: 'Just a test app',
        devName: 'Firefox Developer',
        devUrl: 'https://developer.mozilla.org'
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'bower.json',
      'package.json',
      '.editorconfig',
      '.jshintrc',
      'app/manifest.webapp'
    ]);
  });

  it('incorporates user input in created files', function () {
    assert.fileContent([
      ['app/manifest.webapp', '"name": "Test App"'],
      ['app/manifest.webapp', '"description": "Just a test app"'],
      ['app/manifest.webapp', /"developer": {\s+"name": "Firefox Developer"/],
      ['app/manifest.webapp', '"url": "https://developer.mozilla.org"'],
      ['package.json', '"name": "test-app"'],
      ['bower.json', '"name": "test-app"']
    ]);
  });
});
