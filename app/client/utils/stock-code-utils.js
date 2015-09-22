import moment from 'moment';

import { isObject } from 'lodash';
import { StockExchanges } from '../constants/stock-constants.js';

export function getStockExchange(arg) {
    let code;

    // if the whole Stock bbject is supplied
    if (isObject(arg)) {
        code = arg.stockCode;
    } else {
        code = arg;
    }

    switch (code.substr(0, 1)) {
        case '0':
        case '3':
            return StockExchanges.Shenzhen;
        case '6':
            return StockExchanges.Shanghai;
        default:
            return StockExchanges.UnCategorized;
    }
}

export function isAfterHours(timestamp) {
    let date = new Date(timestamp);

    return date.getHours() >= 14 && date.getMinutes() >= 59;
}

// 20150930153000
export function parseDate(dateStr) {
    return moment(dateStr, 'YYYYMMDDHHmmss').valueOf();
}

export function formatDate(timestamp) {
    return moment(timestamp).format('YYYYMMDDHHmmss');
}
