const path = require('path');
const WebpackShellPluginNext = require('webpack-shell-plugin-next');

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: {
    'internet-tariff': './src/solutions/internet-tariff.ts',
  },
  mode: 'production',
  target: 'node',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true, // Faster builds in development
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
  },
  externals: {
    readline: 'commonjs readline',
    fs: 'commonjs fs',
    process: 'commonjs process',
  },
  // plugins: [
  //   new WebpackShellPluginNext({
  //     executeScripts: ['node dist/internet-tariff.js'],
  //   }),
  // ],
};
