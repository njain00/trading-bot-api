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

    async postStockAnalysisData(analysisData, response) {
        try {
            await this.stockService.postStockAnalysisData(analysisData);

            response.send('The stock analysis data from Vantage has been posted to the database.');
        } catch (ex) {
            this.logger.error(ex);
            response.status(500).send({ error: 'Internal server error' });
        }
    }
}