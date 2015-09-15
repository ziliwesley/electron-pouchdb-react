# electron-pouchdb-react

> A sample project using electron, pouchdb and react to sync stock codes in the
> local database (`pouchdb`) with the remote database (`couchdb`), and enable
> offline querying.

## Babel, ES6 and Electron

### Stage

I chose *stage 0 (Strawman)* with the hope to try out the newset ecmascript
syntax.

### Main Process

modules are compiled on the fly by using the require hook at the entry file:

```js
require('babel/register');
```

### Renderer Process

everything is packed up using the webpack and loaders.

## Roadmap

* [ ] Setting up and play with webpack's hot dev server
* [x] Tuning eslint for code linting
* [ ] Test out the [esdoc](https://esdoc.org/) for documentation auto-generation
* [ ] Try out Jest for unit testing

## Commit Conventions

Following commit conventions of [conventional-changelog/conventions/eslint](https://github.com/ajoslin/conventional-changelog/blob/master/conventions/eslint.md)
