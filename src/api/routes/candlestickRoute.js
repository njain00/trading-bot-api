'use strict'

export default class CandlestickRoute {

    constructor({ stockApiController }) {
        this.stockApiController = stockApiController
    }

    setCandlestickRoutes(router) {
        router.route('/candlestick/analysis')
        .post((request, response) =>
        this.stockApiController.postCandlestickAnalysis(request.body, response));
    }

}