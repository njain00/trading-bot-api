import express from 'express';
var router = express.Router();
var app = express();
import { testFunction } from "../api/routes/stockRoute.mjs";

// // init routes
// require('../api/routes/stockRoute')(router);

// Append value to all endpoint routes
app.use('/api', router);
   
app.listen(3000, function() {
 console.log("Server running on port 3000");
 testFunction(router);
});