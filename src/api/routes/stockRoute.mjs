// module.exports = function(router) {

//     var stockApiController = require('../controllers/stockController');

//     router.route('/stock/user')
//     .get(stockApiController.getStockWithUsers);
// }
import * as stockApiController from '../controllers/stockController.mjs';

export function testFunction(router) {
    router.route('/stock/user')
    .get((request, response) => stockApiController.getStockWithUsers(request, response));
}