'use strict';
var stockRepository = require('../repository/stockRepository');
var _ = require("lodash");

exports.getAllStockUsers = function() {
    return stockRepository.getAllStockUsers().then(stocksFromDb => {
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
    })
}