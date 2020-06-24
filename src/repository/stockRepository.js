import sql from "mssql";
import { connectionString } from '../config/config.js';
import _ from 'lodash';

export default class StockRepository {

    async getAllStockUsers() {
        await sql.connect(connectionString);
        var request = new sql.Request();

        var recordset = await request.query(`SELECT sm.Ticker, sm.CompanyName, u.FirstName, u.LastName, u.EmailAddress
                        FROM StockMetadata sm (NOLOCK)
                        INNER JOIN UserStock us (NOLOCK)
                        ON us.StockID = sm.StockID
                        INNER JOIN [User] u (NOLOCK)
                        ON u.UserId = us.UserID`);
            
        var stocksFromDb = recordset.recordsets[0];
        return stocksFromDb;
    }

    async postCandlestickData(analysisData) {
        await sql.connect(connectionString);
        var request = new sql.Request();

        var table = new sql.Table("Candlestick");
        table.columns.add('Ticker', sql.VarChar(4), {nullable: false});
        table.columns.add('Timestamp', sql.DateTime2, {nullable: false});
        table.columns.add('HighPrice', sql.Numeric, {nullable: false});
        table.columns.add('LowPrice', sql.Numeric, {nullable: false});
        table.columns.add('OpenPrice', sql.Numeric, {nullable: false});
        table.columns.add('ClosePrice', sql.Numeric, {nullable: false});

        _.forEach(analysisData.candlesticks, (candlestick) => {
            table.rows.add(analysisData.ticker, candlestick.timestamp, candlestick.highPrice, candlestick.lowPrice, candlestick.openPrice, candlestick.closePrice);
        });

        await request.bulk(table);
    }

    async postStockMetadata(ticker, companyName) {
        await sql.connect(connectionString);
        var request = new sql.Request();

        request.input('ticker', ticker);
        request.input('companyName', companyName);
        var insertStockMetadataQuery = 'INSERT INTO StockMetadata(Ticker, CompanyName) VALUES (@ticker, @companyName);'

        await request.query(insertStockMetadataQuery);
    }

    async getStockTicker(ticker) {
        await sql.connect(connectionString);
        var request = new sql.Request();

        request.input('ticker', ticker);
        var getStockIdQuery = 'SELECT Ticker FROM StockMetadata WHERE Ticker=@ticker;'

        var recordset = await request.query(getStockIdQuery);

        return recordset.recordset[0];
    }
}