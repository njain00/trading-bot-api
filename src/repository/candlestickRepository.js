'use strict';
import sql from "mssql";
import { connectionString } from '../config/config.js';
import _ from 'lodash';

export default class CandlestickRepository {

    async postCandlestickAnalysis(analysis) {

        await sql.connect(connectionString);

        var request = new sql.Request();

        var table = new sql.Table("Candlestick_Analysis");
        table.columns.add('Ticker', sql.VarChar(4), {nullable: false});
        table.columns.add('Timestamp', sql.DateTime2, {nullable: false});
        table.columns.add('Pattern', sql.VarChar(20) , {nullable: false});
        table.columns.add('Action', sql.VarChar(5) , {nullable: true});

        _.forEach(analysis, (eachAnalysis) => {
            table.rows.add(
                eachAnalysis.Ticker,
                eachAnalysis.Timestamp,
                eachAnalysis.Pattern,
                eachAnalysis.Action);
        });

        await request.bulk(table);
    }
}