module.exports = function(app) {

    var stockApiController = require('../controllers/stockController');

    app.route('/stock/user')
    .get(stockApiController.getStockWithUsers);
}