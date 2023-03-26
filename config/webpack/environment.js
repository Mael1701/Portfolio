const { environment } = require('@rails/webpacker');
const webpack = require('webpack');

// Ajoutez ces lignes pour activer le support des fichiers CSS
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
environment.plugins.prepend(
  'MiniCssExtractPlugin',
  new MiniCssExtractPlugin({ filename: 'css/[name]-[contenthash].css' })
);
environment.loaders.prepend('css', {
  test: /\.css$/,
  use: [MiniCssExtractPlugin.loader, 'css-loader'],
});

module.exports = environment;

