export default {
    STOCK_QUOTE_BASE_API: 'http://webstock.quote.hermes.hexun.com',

    // Enum to indentify which Stock Exchange a stock belongs to
    StockExchanges: {
        UnCategorized: 0,
        // Shenzhen Stock Exchange, China
        Shenzhen: 1,
        // Shanghai Stock Exchange, China
        Shanghai: 2,
        // StockExchanges of China, including:
        //     - Shenzhen
        //     - Shanghai
        China: 3
    }
}
