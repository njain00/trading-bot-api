'use strict';
import StockService from '../../service/stockService.js'
import Pino from 'pino';

export default class StockController {

    constructor(logger)
    {
        this.logger = logger;
    }

    async getStockWithUsers(request, response) {
        var stockService = new StockService(this.logger);
        try {
            var stockWithUsers = await stockService.getAllStockUsers()
            response.json(stockWithUsers);
        }
        catch (ex)
        {
            this.logger.error(ex);
            response.status(500).send({ error: 'Internal server error' });
        }

    }
}