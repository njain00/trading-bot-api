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
                        ON us.Ticker = sm.Ticker
                        INNER JOIN [User] u (NOLOCK)
                        ON u.Username = us.Username`);
            
        var stocksFromDb = recordset.recordsets[0];
        return stocksFromDb;
    }

    async postCandlestickData(stockData) {
        await sql.connect(connectionString);
        var request = new sql.Request();

        var table = new sql.Table("Candlestick");
        table.columns.add('Ticker', sql.VarChar(4), {nullable: false});
        table.columns.add('Timestamp', sql.DateTime2, {nullable: false});
        table.columns.add('HighPrice', sql.Numeric(7,2), {nullable: false});
        table.columns.add('LowPrice', sql.Numeric(7,2), {nullable: false});
        table.columns.add('OpenPrice', sql.Numeric(7,2), {nullable: false});
        table.columns.add('ClosePrice', sql.Numeric(7,2), {nullable: false});

        _.forEach(stockData.Candlesticks, (candlestick) => {
            table.rows.add(
                stockData.Ticker,
                candlestick.Timestamp,
                candlestick.HighPrice,
                candlestick.LowPrice,
                candlestick.OpenPrice,
                candlestick.ClosePrice);
        });

        await request.bulk(table);
    }

    async postStockMetadata(stock) {
        await sql.connect(connectionString);
        var request = new sql.Request();

        request.input('ticker', stock.Ticker);
        request.input('companyName', stock.CompanyName);
        var insertStockMetadataQuery = 'INSERT INTO StockMetadata(Ticker, CompanyName) VALUES (@ticker, @companyName);'

        await request.query(insertStockMetadataQuery);
    }

    async isStockInStockAnalysis(ticker) {
        await sql.connect(connectionString);
        var request = new sql.Request();

        request.input('ticker', ticker);
        var getStockIdQuery = 'SELECT Ticker FROM StockMetadata WHERE Ticker=@ticker;'

        var recordset = await request.query(getStockIdQuery);

        if (recordset.recordset.length > 0) {
            return true;
        }

        return false;
    }

    async getCandlestickData(ticker) {
        await sql.connect(connectionString);
        var request = new sql.Request();

        request.input('ticker', ticker);
        var query = 'SELECT Ticker, [Timestamp] FROM Candlestick WHERE Ticker = @ticker';

        var recordset = await request.query(query);

        return recordset.recordset;
    }
}