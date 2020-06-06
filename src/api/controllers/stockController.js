'use strict';
var sql = require("mssql");
var _ = require("lodash");
require('dotenv/config');

exports.getStockWithUsers = function(request, response) {
    
    var config = {
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        server: process.env.DB_SERVER,
        port: parseInt(process.env.DB_PORT, 10),
        database: process.env.DB_DATABASE,
        options: {
            encrypt: false,
            enableArithAbort: false
        }
    }

    sql.connect(config).then(function() {
        var request = new sql.Request();

        request.query(`SELECT sm.Ticker, sm.CompanyName, u.FirstName, u.LastName, u.EmailAddress
                       FROM StockMetadata sm (NOLOCK)
                       INNER JOIN UserStock us (NOLOCK)
                       ON us.StockID = sm.StockID
                       INNER JOIN [User] u (NOLOCK)
                       ON u.UserId = us.UserID`, function(error, recordset) {
            
            var stocksFromDb = recordset.recordsets[0];
            var stockWithUsers = [];
            _.forEach(stocksFromDb, function(stock) {

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
            response.json(stockWithUsers);
        });
    });
}