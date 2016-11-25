var webpack = require('webpack');

module.exports = {
    entry: "./src/index.js",
    output: {
      path: __dirname + '/build/',
      filename: 'bundle.js'
    },
    module: {
        loaders: [
          // html loader
          {
            test: /\.html$/,
            loader: 'webcomponents-loader',
            query: {
              babel: {
                presets: 'es2015',
                compact: true
              },
              minify: {
                removeAttributeQuotes: true,
                minifyCSS: true,
                minifyJS: true,
                removeComments: true,
                collapseWhitespace: true
              }
            }
          },
          // es6 babel loader
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015']
            }
          },
          // css loader
          {
            test: /\.css$/,
            loader: "style!css"
          },
          // binary / other file loader
          {
            test: /.*\.(gif|png|jpe?g|svg)$/i,
            loaders: ['file?hash=sha512&digest=hex&name=[hash].[ext]', 'image-webpack?bypassOnDebug&optimizationLevel=5']
          }
        ]
    },
    // development server
    devServer: {
      contentBase: './build/',
      port: 1337,
      hot: true,
      inline: true
    }
};
