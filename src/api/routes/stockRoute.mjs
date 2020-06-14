import StockApiController from '../controllers/stockController.mjs';
import { getLogger } from '../../config/pinoLogger.mjs'

export default class StockRoute {

    setStockRoutes(router) {
        var stockApiController = new StockApiController(getLogger());
        router.route('/stocks/users')
        .get((request, response) => stockApiController.getStockWithUsers(request, response));
    }

}