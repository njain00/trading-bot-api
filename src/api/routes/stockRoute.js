module.exports = function(app) {

    var stockApiController = require('../controllers/stockController');

    app.route('/api/stock/user')
    .get(stockApiController.getStockWithUsers);
}