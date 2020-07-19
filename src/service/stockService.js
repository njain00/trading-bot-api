'use strict';

import _ from 'lodash';
// import { container } from 'awilix';

export default class StockService {

    constructor({ logger, stockRepository })
    {
        this.logger = logger
        this.stockRepository = stockRepository
    }

    async getAllStockUsers() {
        var stocksFromDb = await this.stockRepository.getAllStockUsers();
        var stockWithUsers = [];

        _.forEach(stocksFromDb, (stock) => {
            try
            {
                // JSON Output: [Ticker: '', CompanyName: '', Users: []]
                var indexValue = _.findIndex(stockWithUsers, {Ticker : stock.Ticker});
                var user = {};
                user["FirstName"] = stock.FirstName;
                user["LastName"] = stock.LastName;
                user["EmailAddress"] = stock.EmailAddress;
                if (indexValue != -1)
                {
                    stockWithUsers[indexValue]["Users"].push(user);
                }
                else
                {
                    stockWithUsers.push({"Ticker": stock.Ticker
                                        ,"CompanyName": stock.CompanyName
                                        ,"Users": [user]});
                }
            }
            catch (ex)
            {
                this.logger.error({stock: stock }, "Error on the following stock. Look for error message with same pid.");
                throw ex;
            }
        });

        return stockWithUsers;
    }

    async postCandlestickData(stockData) {
        try {
            if (!(await this.stockRepository.isStockInStockAnalysis(stockData.Ticker))) {
                await this.stockRepository.postStockMetadata(stockData);
                await this.stockRepository.postCandlestickData(stockData);            
            }
            else
            {
                stockData.Candlesticks = this.convertStringToDate(stockData.Candlesticks);

                var existingCandlesticks = await this.stockRepository.getCandlestickData(stockData.Ticker);

                var newCandlestickData = _.differenceWith(stockData.Candlesticks, existingCandlesticks, this.candlestickComparator);

                if (newCandlestickData.length > 0)
                {
                    stockData.Candlesticks = newCandlestickData;
                    this.stockRepository.postCandlestickData(stockData);
                }
            }
        } catch (ex) {
            this.logger.error({Ticker: stockData.Ticker}, ex);
            throw ex;
        }
    }

    candlestickComparator(candlestick1, candlestick2) {
        var candlestickTime1 = candlestick1.Timestamp.getTime();
        var candlestickTime2 = candlestick2.Timestamp.getTime();

        var isDateTheSame = candlestickTime1 === candlestickTime2;
        
        return isDateTheSame;
    }

    convertStringToDate(candlesticks) {
        for (var i = 0; i < candlesticks.length; i++)
        {
            candlesticks[i].Timestamp = new Date(candlesticks[i].Timestamp);
        }

        return candlesticks;
    }
    
}