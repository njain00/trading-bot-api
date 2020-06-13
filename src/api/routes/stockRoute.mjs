import StockApiController from '../controllers/stockController.mjs';

export default class StockRoute {

    setStockRoutes(router) {
        var stockApiController = new StockApiController();
        router.route('/stock/user')
        .get((request, response) => stockApiController.getStockWithUsers(request, response));
    }

}