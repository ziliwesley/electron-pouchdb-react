import { EventEmitter } from 'events';
import { find, findLastIndex } from 'lodash';
import AppDispatcher from '../dispatcher/app-dispatcher';
import { getFavoritesList, saveFavoriteList, getStockList, syncWith } from './pouchdb-store';

class StockListStore extends EventEmitter {
    constructor() {
        super();
        this.stockList = [];
        this.favorites = [];

        getStockList()
            .then((response) => {
                this.stockList = response.collection;
            });

        getFavoritesList()
            .then((response) => {
                this.favorites = response.collection;
                this.emit('favorites_update');
            });
    }

    getAll() {
        return this.stockList;
    }

    getCandidates(keyword = '') {
        const pattern = new RegExp(keyword.toLowerCase().replace(/\s+/g, ''));
        const codeMatches = [];
        const nameMatches = [];

        if (keyword.length < 2) {
            return [];
        }

        this.stockList
            .forEach((stock) => {
                if (pattern.test(stock.stockCode)) {
                    return codeMatches.push(stock);
                }

                if (pattern.test(stock.name)) {
                    return nameMatches.push(stock);
                }
            });

        return codeMatches
            .concat(nameMatches)
            .splice(0, 50);
    }

    getAllFavorites() {
        return this.favorites;
    }

    addFavorite(stock) {
        let match = find(this.favorites, 'stockCode', stock.stockCode);
        if (!match) {
            this.favorites.unshift(stock);
            saveFavoriteList(this.favorites)
                .then((response) => {
                    this.emit('favorites_update');
                });
        }
    }

    removeFavorite(stock) {
        let index = findLastIndex(this.favorites, 'stockCode', stock.stockCode);
        if (index > -1) {
            this.favorites.splice(index, 1);
            saveFavoriteList(this.favorites)
                .then((response) => {
                    this.emit('favorites_update', this.favorites);
                });
        }
    }

    getUpstream() {
        return localStorage.getItem('upstream') || 'http://localhost:5984';
    }

    /**
     * Sync local PouchDB with remote CouchDB DB
     * @param  {string} upstream Base url of upstream CouchDB
     * @return {Promise}
     */
    syncStockList(upstream) {
        return syncWith(upstream)
            .on('change', (info) => {
                let notification = new Notification('Sync', {
                    title: 'Sync',
                    body: 'Stock List Updated.'
                });
            })
            .on('error', (err) => {
                let notification = new Notification('Sync', {
                    title: 'Sync',
                    body: `Sync Failed: ${err.message}`
                });

                this.emit('synced');
            })
            .on('complete', (info) => {
                let notification;
                if (info.docs_written > 0) {
                    notification = new Notification('Sync', {
                        title: 'Sync',
                        body: 'Stock list updated.'
                    });
                } else {
                    notification = new Notification('Sync', {
                        title: 'Sync',
                        body: 'No updates available.'
                    });
                }

                this.emit('synced');
            });
    }
}

const stockInfoStore = new StockListStore();

AppDispatcher.register((payload) => {
    switch (payload.type) {
        case 'query':
            stockInfoStore.emit('query', payload.keyword.trim());
            break;
        case 'add':
            stockInfoStore.addFavorite(payload.stock);
            break;
        case 'remove':
            stockInfoStore.removeFavorite(payload.stock);
            break;
        case 'sync':
            stockInfoStore.syncStockList(payload.upstream);
            break;
        default:
    }
});

export default stockInfoStore;
