# webcomponents-loader [![npm version](https://badge.fury.io/js/webcomponents-loader.svg)](https://badge.fury.io/js/webcomponents-loader)
[![NPM](https://nodei.co/npm/webcomponents-loader.png)](https://nodei.co/npm/webcomponents-loader/)

Webpack loader for webcomponents. When you want to load webcomponents directly with webpack and package them together, you can take this loader. Simply load any `.html` file with 'require' or 'import'.

Actual supported features:
* Load .html files
* Compile included javascript with babel
* Compress the html/css/javascript with minify
* Included javascript will be automatically executed on import

## How to use
Install the webcomponents-loader with the following command:
`npm install webcomponents-loader --save-dev`

Configure the loader in the `webpack.config.js` as following:
```javascript
module.exports = {
    // ...
    module: {
        loaders: [
          // html loader
          {
            test: /\.html$/,
            loader: 'webcomponents-loader',
            query: {
              // optinal parameter to use babel
              babel: {
                presets: 'es2015',
                compact: true
              },
              // optinal parameter to use minify
              minify: {
                removeAttributeQuotes: true,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true,
                collapseWhitespace: true
              }
            }
          }
          // ...
        ]
    }
};

```

## Known Bugs
The `document.currentScript` and `document._currentScript` is nor working correctly. It will always guide to your `build.js` file/tag.
* Instead of `document.currentScript` you can use the `currentWebcomponent` variable to get your actual tag reference.

## Contribution
Feel free to submit any bugfix or additional feature. If it's good documented and adds value i will accept your request.

## License
MIT (http://www.opensource.org/licenses/mit-license.php)
