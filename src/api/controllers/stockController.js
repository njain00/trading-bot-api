'use strict';
var stockService = require('../../service/stockService');

exports.getStockWithUsers = function(request, response) {

    var stockWithUsers = stockService.getAllStockUsers().then(stockWithUsers => {
        response.json(stockWithUsers);
    })
}