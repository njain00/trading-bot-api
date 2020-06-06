var express = require("express");
var router = express.Router();
var app = express();

// init routes
require('../api/routes/stockRoute')(router);

// Append value to all endpoint routes
app.use('/api', router);
   
app.listen(3000, function() {
 console.log("Server running on port 3000");
});