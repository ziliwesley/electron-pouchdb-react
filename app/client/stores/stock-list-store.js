import { EventEmitter } from 'events';
import AppDispatcher from '../dispatcher/app-dispatcher';

class StockListStore extends EventEmitter {
    constructor() {
        super();
        this.stockList = [
            {
                code: '600009',
                name: '股票1'
            },
            {
                code: '600010',
                name: '股票2'
            },
            {
                code: '600011',
                name: '股票3'
            },
            {
                code: '600012',
                name: '股票4'
            },
            {
                code: '000009',
                name: '股票11'
            },
            {
                code: '000010',
                name: '股票12'
            },
            {
                code: '000011',
                name: '股票13'
            },
            {
                code: '000012',
                name: '股票14'
            }
        ];
    }

    getAll() {
        return this.stockList;
    }

    getCandidates(keyword = '') {
        const pattern = new RegExp(keyword.toLowerCase().replace(/\s+/g, ''));
        const codeMatches = [];
        const nameMatches = [];

        if (keyword.length < 1) {
            return [];
        }

        this.stockList
            .forEach((stock) => {
                if (pattern.test(stock.code)) {
                    return codeMatches.push({
                        code: stock.code.replace(pattern, `<b class="am-text-success">${keyword}</b>`),
                        name: stock.name.replace(pattern, `<b class="am-text-success">${keyword}</b>`)
                    });
                }

                if (pattern.test(stock.name)) {
                    return nameMatches.push({
                        code: stock.code.replace(pattern, `<b class="am-text-success">${keyword}</b>`),
                        name: stock.name.replace(pattern, `<b class="am-text-success">${keyword}</b>`)
                    });
                }
            });

        return codeMatches.concat(nameMatches);
    }
}

const stockInfoStore = new StockListStore();

AppDispatcher.register((payload) => {
    switch (payload.type) {
        case 'query':
            stockInfoStore.emit('query', payload.keyword.trim());
            break;
        default:
    }
});

export default stockInfoStore;
