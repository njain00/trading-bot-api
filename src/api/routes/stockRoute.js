'use strict'

export default class StockRoute {

    constructor({ stockApiController }) {
        this.stockApiController = stockApiController
    }

    setStockRoutes(router) {
        router.route('/stocks/users')
        .get((request, response) => 
        this.stockApiController.getStockWithUsers(request, response));

        router.route('/stocks/candlesticks')
        .post((request, response) =>
        this.stockApiController.postCandlestickData(request.body, response));
    }

}