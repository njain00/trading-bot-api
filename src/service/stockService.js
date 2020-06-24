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
                // JSON Output: [ticker: '', companyName: '', users: []]
                var indexValue = _.findIndex(stockWithUsers, {ticker : stock.Ticker});
                var user = {};
                user["firstName"] = stock.FirstName;
                user["lastName"] = stock.LastName;
                user["emailAddress"] = stock.EmailAddress;
                if (indexValue != -1)
                {
                    stockWithUsers[indexValue]["users"].push(user);
                }
                else
                {
                    stockWithUsers.push({"ticker": stock.Ticker
                                        ,"companyName": stock.CompanyName
                                        ,"users": [user]});
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

    async postStockAnalysisData(analysisData) {
        try {
            var stockId = await this.stockRepository.getStockId(analysisData.ticker);
            if (stockId == null) {
                await this.stockRepository.postStockMetadata(analysisData);
                var stockId = await this.stockRepository.getStockId(analysisData.ticker);
                analysisData.stockId = stockId.StockId;
            }
            await this.stockRepository.postCandlestickData(analysisData);
        } catch (ex) {
            this.logger.error({ticker: analysisData.ticker}, 'Error when looking at the following ticker.');
            throw ex;
        }
    }
    
}