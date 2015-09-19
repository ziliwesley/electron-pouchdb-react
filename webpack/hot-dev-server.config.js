'use strict';

module.exports = require('./make-config')({
    devServer: true,
    devtool: 'eval-source-map',
    hotComponents: true,
    debug: true
});
