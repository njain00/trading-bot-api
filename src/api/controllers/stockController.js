'use strict';

export default class StockController {

    constructor({ logger, stockService })
    {
        this.logger = logger;
        this.stockService = stockService;
    }

    async getStockWithUsers(request, response) {
        try {
            var stockWithUsers = await this.stockService.getAllStockUsers()
            response.json(stockWithUsers);
        }
        catch (ex)
        {
            this.logger.error(ex);
            response.status(500).send({ error: 'Internal server error' });
        }

    }

    async postCandlestickData(stockData, response) {
        try {
            await this.stockService.postCandlestickData(stockData);

            response.status(201).send('The candlestick data from Vantage has been posted to the database.');
        } catch (ex) {
            this.logger.error(ex);
            response.status(500).send({ error: `Error when posting candlestick data to database. The error is as follows: ${ex}` });
        }
    }
}