var express = require('express');
var router = express.Router();
let customerService= require('../services/CustomerService')

router.get('/',function(req,res){
    res.render('form',{foo:'execute form'});
});

router.post('/', (req, res) => {
    customerService.SaveCustomer(req).then(() => {
        res.redirect('/customers');
    }).catch((err) => { console.log(err) });
});


module.exports = router;