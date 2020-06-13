'use strict';

import StockRepository from '../repository/stockRepository.mjs';
import _ from 'lodash';

export default class StockService {

    async getAllStockUsers() {
        var stockRepository = new StockRepository();
        var stocksFromDb = await stockRepository.getAllStockUsers();
            var stockWithUsers = [];
            _.forEach(stocksFromDb, function(stock) {
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
                    console.error("Error on the following stock: \n", stock);
                    throw ex;
                }
            });
            return stockWithUsers;
    }
    
}