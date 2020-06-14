import StockApiController from '../controllers/stockController.js';
import { getLogger } from '../../config/pinoLogger.js'

export default class StockRoute {

    setStockRoutes(router) {
        var stockApiController = new StockApiController(getLogger());
        router.route('/stocks/users')
        .get((request, response) => stockApiController.getStockWithUsers(request, response));
    }

}