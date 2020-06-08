require('dotenv').config();

var connectionString = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    port: parseInt(process.env.DB_PORT, 10),
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false,
        enableArithAbort: false
    }
}

module.exports = { connectionString };