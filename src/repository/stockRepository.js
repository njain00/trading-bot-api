var sql = require("mssql");

export default class StockRepository {

    async GetStocksWithUsers() {

        var config = {
            user: '',
            password: '',
            server: '',
            database: ''
        }

        sql.connect(config, function(err) {
            var request = sql.Request();

            request.query('select * from stocks', function(error, recordset) {
                return recordset;
            });
        });
    }
}