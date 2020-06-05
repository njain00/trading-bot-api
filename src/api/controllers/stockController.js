'use strict';
var sql = require("mssql");

exports.getStockWithUsers = function(request, response) {
    
    var config = {
        user: '',
        password: '',
        server: '',
        port: 0,
        database: ''
    }

    sql.connect(config).then(function() {
        var request = new sql.Request();

        request.query(`SELECT sm.Ticker, sm.CompanyName, u.FirstName, u.LastName, u.EmailAddress
                       FROM StockMetadata sm (NOLOCK)
                       INNER JOIN UserStock us (NOLOCK)
                       ON us.StockID = sm.StockID
                       INNER JOIN [User] u (NOLOCK)
                       ON u.UserId = us.UserID`, function(error, recordset) {
            response.json(recordset.recordsets);
        });
    });
}