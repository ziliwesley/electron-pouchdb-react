import PouchDB  from 'pouchdb';

const favDB = new PouchDB('fav_db');
const stockDB = new PouchDB('stock_db');

export function getFavoritesList() {
    return favDB.get('favorites')
        .then((response) => {
            return response;
        }, (err) => {
            // Document not found
            if (err.status === 404) {
                return {
                    id: 'favorites',
                    collection: []
                };
            }
        });
}

export function saveFavoriteList(collection) {
    return favDB.get('favorites')
        .then((doc) => {
            return favDB.put({
                collection
            }, 'favorites', doc._rev);
        }, (err) => {
            // Document not found
            if (err.status === 404) {
                return favDB.put({
                    collection
                }, 'favorites');
            }
        });
}

export function getStockList() {
    return stockDB.get('stock_list')
        .then((response) => {
            return response;
        }, (err) => {
            // Document not found
            if (err.status === 404) {
                return {
                    id: 'stock_list',
                    collection: []
                };
            }
        });
}

export function syncWith(upstream) {
    const remote = `${upstream}/stock_db`;

    return PouchDB
        .replicate(remote, 'stock_db', {
            live: false,
            retry: false
        });
}
