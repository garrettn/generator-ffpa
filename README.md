# generator-ffpa

[![npm version](https://badge.fury.io/js/generator-ffpa.svg)](http://badge.fury.io/js/generator-ffpa)
[![Build Status](https://secure.travis-ci.org/garrettn/generator-ffpa.svg?branch=master)](http://travis-ci.org/garrettn/generator-ffpa)
[![Dependencies](https://david-dm.org/garrettn/generator-ffpa.svg?style=flat)](https://david-dm.org/garrettn/generator-ffpa)
[![devDependencies](https://david-dm.org/garrettn/generator-ffpa/dev-status.svg?style=flat)](https://david-dm.org/garrettn/generator-ffpa#info=devDependencies)

> [Yeoman](http://yeoman.io) generator for creating a Firefox OS packaged app 


## Introduction

generator-ffpa is a tool to help you get up and running quickly when building an app for Firefox OS. It is designed specifically for creating [packaged apps](https://developer.mozilla.org/en-US/Marketplace/Options/Packaged_apps) that run in a simulator or on a device, so it doesn't include a development server. In development mode, though, it still provides niceties such as source maps and automatically rebuilding on file changes.

The app scaffolded by this generator uses [Webpack](http://webpack.github.io) to bundle assets. Webpack is pretty amazing, and this app barely scratches the surface of what it is capable of, so be sure to check out [the documentation](http://webpack.github.io).

## Features

- Bundle JavaScript and other assets with Webpack. That means you can write your code with CommonJS, AMD, or ES6 modules, resulting in a better-organized app than you would get by just adding script tags to HTML. You also get the benefit of Webpack's [loaders](http://webpack.github.io/docs/list-of-loaders.html) and [plugins](http://webpack.github.io/docs/list-of-plugins.html).
- Automatically transpile ES6 and JSX syntax with [Babel](http://babeljs.io).
- Automatically add CSS vendor prefixes with [Autoprefixer](https://github.com/postcss/autoprefixer) (supporting Firefox OS 2.0 and up).
- Automatically process assets used by CSS, like images and fonts. PNGs and SVGs are inlined up to 10kb. Larger files as well as JPGs and font files are copied for you, so you don't need to worry about tracking them yourself.
- Use JS and CSS source maps in development mode.
- Watch files for changes and automatically rebuild in development mode.
- Easily create a zip archive of your app for submission to the Firefox Marketplace.

## Installation

### Requirements

- [Node.js](https://nodejs.org) or [io.js](https://iojs.org) ([nvm](https://github.com/creationix/nvm) is highly recommended)
- [yo](http://yeoman.io)
- [bower](http://bower.io)

Install generator ffpa globally with npm:

```sh
$ npm install -g generator-ffpa
```

## Usage

### Starting a new project

As usual with a Yeoman generator, create a new directory, change into it, and call `yo ffpa`:

```sh
$ mkdir my-app
$ cd my-app
$ yo ffpa
```

Then answer the prompts, and your app will be scaffolded for you!

By default, Yeoman will automatically install the app's npm and Bower dependencies. If you wish to prevent that, run the command with the `--skip-install` option.

### Working on the app

To create an initial build and then watch files for changes, simply run

```sh
$ npm start
```

You can then open the project in the [WebIDE](https://developer.mozilla.org/en-US/docs/Tools/WebIDE) and push it to whatever environment you're working with.

Note that the app's `package.json` is already configured to have the WebIDE look inside the `dist` folder for the actual app files to push. This is a feature available since Firefox 37 ([see the documentation](https://developer.mozilla.org/en-US/docs/Tools/WebIDE/Running_and_debugging_apps#Running_a_custom_build_step)), which makes it possible to open the project root directory instead of just `dist` and work entirely inside the WebIDE if you want. The `prepackage` setting was deliberately left out so you can benefit from file watching and see helpful output from the terminal.

To create a development build without file watching, you can run

```sh
$ npm run build-dev
```



### Creating a production build

To create an optimized build for production (with minified files and no source maps), run

```sh
$ npm run build
```

To create a zip file suitable for submitting to the Firefox Marketplace, run

```sh
$ npm run pack
```

This command will generate a zip archive in the project root folder.

## App structure

generator-ffpa creates an app structure that is intentionally minimal so you can easily make it into whatever works best for your app. If you're unfamiliar with Webpack, some of this structure might seem a little strange to you. Here's a brief description of the most important files:

- **app/**—Your app's source files
    - **scripts/**
        - **main.js**—The “entry point” script of your app. The contents of this script get executed immediately. Because it's using Webpack, it can require other modules as the example shows. It also loads the main stylesheet and a couple other files needed to make the app work.
    - **styles/**
        - **main.css**—The main stylesheet, which gets required by `main.js`. This stylesheet can import other stylesheets just like scripts, thanks to Webpack. You may choose to modularize the styles in individual files, or you can put them all in this one file.
    - **images/**
        - **icon128.png**—A Firefox OS app is required to have a 128x128 icon. The example icon comes from a [GPL-licensed icon set from Elegant themes](http://www.elegantthemes.com/blog/freebie-of-the-week/beautiful-flat-icons-for-free). Don't forget to change it for your own!
        - **icon512.png**—It is recommended to also have a 512x512 icon.
    - **index.html**—This file is a template for the actual `index.html` file generated by the [HTML Webpack Plugin](https://github.com/ampedandwired/html-webpack-plugin), which gets automatically injected with the bundled CSS and JavaScript files. You can add any HTML you want here, including additional elements the app needs at the start or assets that aren't bundled by Webpack.
    - **manifest.webapp**—This JSON file is what makes a Firefox OS app a Firefox OS app. The provided manifest already includes all the required fields, but you may need to modify it if, for example, you need to request additional permissions for your app. See the [app manifest documentation](https://developer.mozilla.org/en-US/Apps/Build/Manifest).
- **dist/**—Your built app's files will show up here.
- **node_modules/**—Dependencies installed through npm are put here. See section below on using third-party dependencies.
- **bower_components/**—Dependencies installed through Bower are put here.
- **package.json**—This file tracks your npm dependencies. Make sure to install with `--save` so they are tracked here.
- **bower.json**—This file tracks your Bower dependencies. Always install with `--save` so they are tracked here.
- **webpack.config.js**—See the [documentation on configuring Webpack](http://webpack.github.io/docs/configuration.html).

## Using third-party dependencies

You have two main options for bringing in third-party dependencies: [npm](https://www.npmjs.com) and [Bower](http://bower.io).

Webpack works with npm modules out of the box. If you `require` a module without a relative or absolute path, Webpack automatically looks inside the `node_modules` for it.

```js
// domify is installed through npm
var domify = require('domify');
```

When you don't specify a filename, Webpack brings in the file that is specified as `main` in the module's `package.json` file.

Your generator-ffpa app is configured to use Bower dependencies the same way. Webpack will look for modules in both `node_modules` and `bower_components`. If you just use the module name without a filename, Webpack will use file specified as `main` in the package's `bower.json` file (not all Bower packages specify a `main` file, so just be warned).

You can also import files in your CSS and they will be bundled just like the JavaScript. Webpack translates CSS `@import` statements into `require` statements like so:

```css
/* relative path */
@import url(header.css); /* becomes require('./header.css');

/* npm or Bower module */
@import url(~normalize-css); /* becomes require('normalize-css'); */
```

## Problems? Suggestions?

This generator project is still in its very early stages, so there are likely to be bugs or missing functionality. Please check out the [issue list](https://github.com/garrettn/generator-ffpa/issues) to see if your issue or idea has already been brought up. If it hasn't, feel free to add it. Better yet, submit a pull request with your fixes or improvements.

Please keep in mind that this generator is not trying to be everything for everyone. I intend for it to be fairly minimal, with enough functionality to let you get up and running quickly, but not with so many features that you have to spend time deleting a lot of boilerplate that you don't need.


## License

generator-ffpa is licensed under the [MIT License](LICENSE.txt).
