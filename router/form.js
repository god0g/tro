var express = require('express');
var router = express.Router();
const db = require('../util/database')


router.get('/',function(req,res){
    res.render('form',{foo:'execute form'});
});

router.post('/', (req, res) => {
    var sql = 'insert into Customers (sTpaCode,sCustFirstName,sUserName,sCustLastName,sCustEmail,sCustAddress1,sCustAddress2,sCustCountry,sCustState,sCustZip) values (?,?,?,?,?,?,?,?,?,?)'
    var values =[
     req.session.userInfo.sTpaCode
    ,req.body.firstName
    ,req.body.lastName
    ,req.body.username
    ,req.body.email
    ,req.body.address
    ,req.body.address2
    ,req.body.country
    ,req.body.state
    ,req.body.zip
]
    db.execute(sql,values).then(()=>{
        res.redirect('/customers');
    }).catch((err)=>{console.log(err)});

});


module.exports = router;