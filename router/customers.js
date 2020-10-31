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





module.exports = router;