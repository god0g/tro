var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var options={
    host:'localhost',
    user:'root',
    database:'nodejs-study-session',
    password:'m1455200393'
}

var sessionStore = new MySQLStore(options);

module.exports = session({ store: sessionStore, secret: 'my secret', resave: false, saveUninitialized: false });