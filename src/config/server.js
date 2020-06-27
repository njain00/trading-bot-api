import express from 'express';
import bodyParser from 'body-parser';
var router = express.Router();
var app = express();
import StockRoute from "../api/routes/stockRoute.js";
    
export default class Server {

    constructor(container)
    {
        this.stockRoute = container.resolve('stockRoute')
    }

    startup() {
        
        // Append value to all endpoint routes
        app.use(bodyParser.json());
        
        app.use('/api', router);
        
        app.listen(3000, () => {
            console.log("Server running on port 3000");
            this.stockRoute.setStockRoutes(router);
    });
    } 
}