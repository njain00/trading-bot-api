module.exports = function(router) {

    var stockApiController = require('../controllers/stockController');

    router.route('/stock/user')
    .get(stockApiController.getStockWithUsers);
}