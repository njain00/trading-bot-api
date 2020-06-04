module.exports = function(app) {

    var stockApiController = require('../controllers/stockApi');

    app.route('/stock/getAllStocksWithUsers')
    .get(stockApiController.getStockWithUsers);
}