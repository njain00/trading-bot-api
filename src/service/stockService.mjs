'use strict';

import StockRepository from '../repository/stockRepository.mjs';
import _ from 'lodash';
import Pino from 'pino';

export default class StockService {

    constructor()
    {
        var destination = Pino.destination('C:\\logfiles\\trading-bot-api-log.json')
        this.logger = Pino({ level: process.env.LOG_LEVEL || 'info', 
                             sync: false,
                             timestamp: Pino.stdTimeFunctions.isoTime }
                          , destination);
    }

    async getAllStockUsers() {
        var stockRepository = new StockRepository();
        var stocksFromDb = await stockRepository.getAllStockUsers();
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
    
}