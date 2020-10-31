const mysql = require('mysql2');

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'nodejs-study',
    password:'m1455200393'

});

module.exports = pool.promise();