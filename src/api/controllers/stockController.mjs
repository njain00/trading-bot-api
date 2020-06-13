'use strict';
import StockService from '../../service/stockService.mjs'

export default class StockController {

    async getStockWithUsers(request, response) {
        var stockService = new StockService();
        try {
            var stockWithUsers = await stockService.getAllStockUsers()
            response.json(stockWithUsers);
        }
        catch (ex)
        {
            // need to add logging
            console.log(ex.message);
            response.status(500).send({ error: 'Internal server error' });
        }

    }
}