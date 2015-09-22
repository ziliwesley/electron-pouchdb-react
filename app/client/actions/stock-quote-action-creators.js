import fetchJsonp from 'fetch-jsonp';
import Promise from 'bluebird';

import { getStockExchange, parseDate, formatDate } from '../utils/stock-code-utils';
import { StockExchanges, STOCK_QUOTE_BASE_API } from '../constants/stock-constants';
import AppDispatcher from '../dispatcher/app-dispatcher';

export default {
    fetchMinuteData(stock, startFrom) {
        let code, url, fromDate;

        switch (getStockExchange(stock)) {
            case StockExchanges.Shenzhen:
                code = `szse${stock.stockCode}`;
                break;
            case StockExchanges.Shanghai:
                code = `sse${stock.stockCode}`;
                break;
            default:
                return Promise.reject('Invalid stock code');
        }

        if (startFrom) {
            fromDate = formatDate(startFrom);
        } else {
            fromDate = '0';
        }

        url = `${STOCK_QUOTE_BASE_API}/a/minute?code=${code}&number=1000&start=${fromDate}`;

        return fetchJsonp(url)
            .then((response) => {
                return response.json();
            })
            .then((obj) => {
                let rawData = obj.Data;
                let data = {};

                // Price weight
                data.priceWeight = rawData[4];
                // Minute data
                data.minData = rawData[0].map((arr) => {
                    return {
                        dateTime: parseDate(arr[0]),
                        price: arr[1] / data.priceWeight,
                        amount: arr[2],
                        volume: arr[3] / 100
                    };
                });
                data.lastClose = rawData[1] / data.priceWeight;
                data.high = rawData[2] / data.priceWeight;
                data.low = rawData[3] / data.priceWeight;
                data.openTime = parseDate(rawData[5]);
                data.closeTime = parseDate(rawData[6]);

                AppDispatcher.dispatch({
                    type: 'UPDATE_STOCK_TREND',
                    data,
                    stock
                });

                return data;
            });
    }
};
