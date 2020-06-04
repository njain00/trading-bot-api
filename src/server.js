var express = require("express");
var app = express();

// init routes
require('./api/routes/stock')(app);
   
app.listen(3000, function() {
 console.log("Server running on port 3000");
});