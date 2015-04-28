'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var startCase = require('lodash/string/startCase');
var kebabCase = require('lodash/string/kebabCase');

function validateStringLength (input) {
  return input.length > 0;
}

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the striking ' + chalk.red('Firefox packaged app') + ' generator!'
    ));

    var prompts = [{
      name: 'appName',
      message: 'Name of your app:',
      default: startCase(this.appname)
    },
    {
      name: 'description',
      message: 'Description of your app:',
      default: 'My packaged app for Firefox OS'
    },
    {
      name: 'devName',
      message: 'Your name:',
      validate: validateStringLength
    },
    {
      name: 'devUrl',
      message: 'URL to your website (optional):'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      this.props.packageName = kebabCase(props.appName);

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copyTpl(
        this.templatePath('manifest.webapp'),
        this.destinationPath('app/manifest.webapp'),
        this.props
      );
      this.fs.copyTpl(
        this.templatePath('index.html'),
        this.destinationPath('app/index.html'),
        this.props
      );
      this.fs.copyTpl(
        this.templatePath('main.js'),
        this.destinationPath('app/scripts/main.js'),
        this.props
      );
      this.fs.copyTpl(
        this.templatePath('main.css'),
        this.destinationPath('app/styles/main.css'),
        this.props
      );
      this.fs.copy(
        this.templatePath('icon128.png'),
        this.destinationPath('app/images/icon128.png')
      );

      this.fs.copy(
        this.templatePath('icon512.png'),
        this.destinationPath('app/images/icon512.png')
      );
    },

    projectfiles: function () {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        this.props
      );
      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'),
        this.props
      );
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copyTpl(
        this.templatePath('webpack.config.js'),
        this.destinationPath('webpack.config.js'),
        this.props
      );
    }
  },

  install: function () {
    this.installDependencies();
  }
});
