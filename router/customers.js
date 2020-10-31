var express = require('express');
var router = express.Router();
let customerService= require('../services/CustomerService')



router.get('/',function(req,res){
   res.render('listcustomer');
});

router.get('/list',function(req,res){
   customerService.GetCustomerList().then((rows) => {
      res.json(rows);
   });
});


router.get('/form',function(req,res){
   res.render('form',{foo:'execute form'});
});

router.post('/form', (req, res) => {
   customerService.SaveCustomer(req).then(() => {
       res.redirect('/customers');
   }).catch((err) => { console.log(err) });
});






module.exports = router;