const path = require('path');
const baseDir = path.resolve(__dirname, '../webgl-boilerplate');

module.exports = {
    entry: path.join(baseDir, 'src/index.js'),
    devtool: 'eval-source-map',
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader?cacheDirectory=.build',
            exclude: [
                /node_modules/
            ],
        }],
    },
    output: {
        filename: 'bundle.js',
        path: baseDir
    }
};

