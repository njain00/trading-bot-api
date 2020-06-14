'use strict';
import StockService from '../../service/stockService.mjs'
import Pino from 'pino';

export default class StockController {

    constructor()
    {
        var destination = Pino.destination('C:\\logfiles\\trading-bot-api-log.json')
        this.logger = Pino({ level: process.env.LOG_LEVEL || 'info', 
        sync: false,
        timestamp: Pino.stdTimeFunctions.isoTime }, destination);
    }

    async getStockWithUsers(request, response) {
        var stockService = new StockService();
        try {
            var stockWithUsers = await stockService.getAllStockUsers()
            response.json(stockWithUsers);
        }
        catch (ex)
        {
            // need to add logging
            this.logger.error(ex);
            response.status(500).send({ error: 'Internal server error' });
        }

    }
}