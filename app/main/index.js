// Use the require hook to compile files written in es6 on the fly.
// see [Require Hook](https://babeljs.io/docs/usage/require/)
require('babel/register');

// Start the main process
require('./daemon')();
