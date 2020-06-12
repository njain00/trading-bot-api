'use strict';
import * as stockService from '../../service/stockService.mjs'

export async function getStockWithUsers(request, response) {

    var stockWithUsers = await stockService.getAllStockUsers()
    response.json(stockWithUsers);
}