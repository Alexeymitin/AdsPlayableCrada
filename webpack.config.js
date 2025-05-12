const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return {
    entry: './src/index.ts',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      publicPath: '/'
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              happyPackMode: true
            }
          },
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpe?g|webp|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/[name][ext]'
          }
        },
        {
          test: /\.json$/,
          type: 'asset/resource',
          generator: {
            filename: 'assets/[name][ext]'
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'public/index.html'
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src/assets'), // Исходная папка с ассетами
            to: path.resolve(__dirname, 'dist/assets') // Папка назначения
          }
        ]
      }),
      ...(isProd
        ? [
            new ImageMinimizerPlugin({
              minimizer: {
                implementation: ImageMinimizerPlugin.imageminGenerate,
                options: {
                  plugins: [
                    ['mozjpeg', { quality: 75 }],
                    ['pngquant', { quality: [0.65, 0.9] }],
                    ['webp', { quality: 80 }]
                  ]
                }
              }
            })
          ]
        : []),
      ...(isProd ? [new BundleAnalyzerPlugin()] : [])
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'src')
      },
      compress: true,
      port: 9000,
      hot: false
    },
    devtool: isProd ? false : 'source-map',
    optimization: {
      splitChunks: false,
      usedExports: true,
      minimize: isProd
    },
    cache: false,
    performance: { hints: false },
    mode: isProd ? 'production' : 'development'
  };
};
