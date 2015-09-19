'use strict';

//
// Dependencies
// --------------------------------------------------

var jetpack = require('fs-jetpack');
var webpack = require('webpack');

var loadersByExtension = require('loaders-by-extension');
var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');
var WebpackNotifierPlugin = require('webpack-notifier');

//
// Variables
// --------------------------------------------------

var projectDir = jetpack.cwd('app');

module.exports = function (opts) {
    var entry, output, externals, resolve, plugins, loaders, options;

	// The entry point for the bundle.
	// See http://webpack.github.io/docs/configuration.html#entry
	entry = {
		app: [
            projectDir.path('client/app.jsx')
        ]
	}

	// Options affecting the output.
	// See http://webpack.github.io/docs/configuration.html#output
	output = {
		path: projectDir.path('client'),
		filename: 'bundle.js',
        publicPath: opts.devServer ?
            'http://localhost:9090/' :
            './',
		libraryTarget: 'commonjs2'
	}

	// Specify dependencies that shouldn’t be resolved by webpack, but should
	// become dependencies of the resulting bundle. The kind of the dependency
	// depends on `output.libraryTarget`.
	// See http://webpack.github.io/docs/configuration.html#externals
	externals = [
		// examples:
		// - require('react');
		// - require('react/some.js');
		/^react(\/.*)?$/,
		/^reflux(\/.*)?$/,
		'amazeui-react',
		'react-highcharts'
	];

	// A array of automatically applied loaders.
	// See http://webpack.github.io/docs/configuration.html#module-loaders
	loaders = {
		// React components
		'jsx': opts.hotComponents ?
			[ 'react-hot-loader', 'babel-loader' ] : 'babel-loader',
		// Pure javascript files written in ES6/ES7
		'js': 'babel-loader'
	}

	// Options affecting the resolving of modules.
	// See http://webpack.github.io/docs/configuration.html#resolve
	resolve = {
		root: projectDir.path('client'),
		modulesDirectories: [ 'node_modules' ],
		extensions: [
			'',
			'.js',
			'.jsx',
			'.json',
			'.node'
		],
		alias: [],
		packageMains: [
			'webpack',
			'browser',
			'web',
			'browserify',
			['jam', 'main'],
			'main'
		]
	};

	// Add additional plugins to the compiler.
	// See http://webpack.github.io/docs/configuration.html#plugins
	plugins = [
		// Display build status system notifications to the user.
		// See https://github.com/Turbo87/webpack-notifier
		new WebpackNotifierPlugin({
            alwaysNotify: true
        }),
    	// See http://webpack.github.io/docs/build-performance.html#prefetching-modules
		new webpack.PrefetchPlugin('react'),
		new webpack.PrefetchPlugin('react/lib/ReactComponentBrowserEnvironment')
	];

    // Specify `--hot` on the command line will add this automatically, however,
    // using node.js API will not do so.
    // See http://webpack.github.io/docs/webpack-dev-server.html#api
    if (opts.devServer) {
        plugins.unshift(new webpack.HotModuleReplacementPlugin());
    }

	if (opts.minimize) {
		// Minimize all JavaScript output of chunks.
		plugins.push(new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false
			}
		}));

		// Search for equal or similar files and deduplicate them in the output.
		// This is experimental based on official documentation.
		// See http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
		plugins.push(new webpack.optimize.DedupePlugin());

		// When there are errors while compiling this plugin skips the emitting
		// phase (and recording phase)
		// See http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
		plugins.push(new webpack.optimize.NoErrorsPlugin());
	}

	options = {
		entry: entry,
		output: output,
		externals: externals,
		module: {
			loaders: loadersByExtension(loaders)
		},
		// Choose a developer tool to enhance debugging.
		// This will be different depends on the environment:
		// - `production`: default
		// - `development`: 'eval-source-map'
		// See http://webpack.github.io/docs/configuration.html#debug
		devtool: opts.devtool,
		// Switch loaders to debug mode.
		// See http://webpack.github.io/docs/configuration.html#debug
		debug: opts.debug,
		resolve: resolve,
		plugins: plugins,
		devServer: {
			stats: {
				cached: false
			}
		}
	}

	options.target = webpackTargetElectronRenderer(options);

	return options;
};
