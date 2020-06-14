import express from 'express';
var router = express.Router();
var app = express();
import StockRoute from "../api/routes/stockRoute.js";
    
export default class Server {

     startup() {
        var stockRoute = new StockRoute();
        // Append value to all endpoint routes
        app.use('/api', router);
        
        app.listen(3000, function() {
        console.log("Server running on port 3000");
        stockRoute.setStockRoutes(router);
        });
    } 
}