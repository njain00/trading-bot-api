'use strict'

export default class CandlestickRoute {

    constructor({ candlestickController }) {
        this.candlestickController = candlestickController
    }

    setCandlestickRoutes(router) {
        router.route('/candlestick/analysis')
        .post((request, response) =>
        this.candlestickController.postCandlestickAnalysis(request.body, response));
    }

}