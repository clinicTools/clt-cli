const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
    entry: './index.js',
    target: "node",
    externals: [nodeExternals()],
    output: {
        filename: 'index.js'
    },
    resolve: {
        alias: {
            '@components': path.resolve('./src/components'),
            '@views': path.resolve('./src/views'),
            '@assets': path.resolve('./src/assets'),
            '@data': path.resolve('./src/data')
        },
        modules: ["node_modules", "packages"]
    }
}