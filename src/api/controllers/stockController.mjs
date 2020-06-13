'use strict';
import StockService from '../../service/stockService.mjs'

export default class StockController {

    async getStockWithUsers(request, response) {
        var stockService = new StockService();
        var stockWithUsers = await stockService.getAllStockUsers()
        response.json(stockWithUsers);
    }
}