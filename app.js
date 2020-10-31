const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');

const loginRoute = require('./router/login');
const formRoute = require('./router/form');
const testRoute = require('./router/test');
const customerRoute = require('./router/customers');
const auth = require('./middleware/is-auth');
var dbSession =require('./util/databasesession');

var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine','ejs');

app.use(express.static('public'));
app.use(dbSession);

app.get('/',(req,res)=>{
    if (req.session.isLogin) {
        res.redirect('/form');
    }else{
        res.redirect('/login');
    }
});


app.use('/login',loginRoute);
app.use('/form',auth,formRoute);
app.use('/test',auth,testRoute);
app.use('/customers',auth,customerRoute);



app.use((req,res,next)=>{
    res.status(400).sendFile(path.join(__dirname,'views','404.html'));
});

app.listen(3000,()=>{
console.log('application listen on http://localhost:3000');
});
