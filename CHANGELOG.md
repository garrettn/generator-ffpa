## 1.2.0 (2015-05-02)

#### Features

- Use babel-loader to automatically transpile ES6 and JSX syntax.
- Automatically resolve files with `.jsx` extension just like `.js` files.

#### Changes

- jshint-loader now runs as a postloader instead of a preloader. JSHint doesn't understand JSX syntax, so that needs to be transpiled before JSHint can run. As a side effect, JSHint will throw an error if a JSX component doesn't have a `React` variable declared.

### 1.1.1 (2015-05-01)

#### Other

- Add missing changelog notes (so meta!).

## 1.1.0 (2015-05-01)

#### Features

- Automatically inject Webpack bundles into the HTML template without needing any template logic, thanks to the new `inject` feature of html-webpack-template.

# 1.0.0 (2015-04-29)

#### Features

- Scaffold a basic Firefox OS packaged app.
