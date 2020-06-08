var sql = require("mssql");
var { connectionString } = require('../config/config.js');

exports.getAllStockUsers = function() {
    return new Promise((resolve, reject) => { sql.connect(connectionString).then(function() {
        var request = new sql.Request();

        request.query(`SELECT sm.Ticker, sm.CompanyName, u.FirstName, u.LastName, u.EmailAddress
                       FROM StockMetadata sm (NOLOCK)
                       INNER JOIN UserStock us (NOLOCK)
                       ON us.StockID = sm.StockID
                       INNER JOIN [User] u (NOLOCK)
                       ON u.UserId = us.UserID`, function(error, recordset) {
            
        var stocksFromDb = recordset.recordsets[0];
        resolve(stocksFromDb);
            
        });
    })
});
}