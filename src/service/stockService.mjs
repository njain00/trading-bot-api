'use strict';
// var stockRepository = require('../repository/stockRepository');
// var _ = require("lodash");

import * as stockRepository from '../repository/stockRepository.mjs';
import _ from 'lodash';

export async function getAllStockUsers() {
    var stocksFromDb = await stockRepository.getAllStockUsers();
        var stockWithUsers = [];
        _.forEach(stocksFromDb, function(stock) {

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
        });
        return stockWithUsers;
}