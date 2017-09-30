var ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.servers = { // 配置同步到哪台机器
  dev1: {
    host: '10.8.12.12',
    domain: '//abc.github.com',
    port: 121,
    local: './', // 默认当前目录
    path: '/usr/local/multi', //服务器端要存放的地址
    sudo: false
  },
}

exports.config = function() {
  return {
    webpackConfig: function(jsConfig, cssConfig, options, context) {
      jsConfig.resolve.alias = {
        "base": "./src/scripts/base",
      }
      cssConfig.module.rules = cssConfig.module.rules.concat([{
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }, {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      }, {
        test: /\.(scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }]);
      jsConfig.module.rules = jsConfig.module.rules.concat([{
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }, {
        test: /\.(scss|sass)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }]);
      jsConfig.plugins.push(new ExtractTextPlugin(jsConfig.output.filename.replace('[ext]', '.css')))
      cssConfig.plugins.push(new ExtractTextPlugin(cssConfig.output.filename.replace('[ext]', '.css')))
      return {jsConfig: jsConfig, cssConfig: cssConfig};
    },
    exports: [ // 要编译压缩的文件
      "styles/base.less"
    ]
  }
};