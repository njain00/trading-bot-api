import sql from "mssql";
import { connectionString } from '../config/config.mjs';

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
}