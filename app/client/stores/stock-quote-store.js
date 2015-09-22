import { EventEmitter } from 'events';
import { find, findLastIndex, assign } from 'lodash';
import AppDispatcher from '../dispatcher/app-dispatcher';

let trendData = {
    minData: [],
    lastClose: 0.00,
    high: 0.00,
    low: 0.00,
    openTime: 0.00,
    closeTime: 0.00
};

class StockQuoteStore extends EventEmitter {
    constructor() {
        super();
    }

    getStockTrend() {
        return assign({}, trendData, {
            minData: trendData.minData.map((data) => {
                return [data.dateTime, data.price];
            })
        });
    }
}

const stockInfoStore = new StockQuoteStore();

AppDispatcher.register((payload) => {
    switch (payload.type) {
        case 'UPDATE_STOCK_TREND':
            trendData = assign({}, payload.data, {
                stock: payload.stock
            });
            stockInfoStore.emit('trendUpdated', payload.stock.stockCode);
            break;
        default:
    }
});

export default stockInfoStore;
