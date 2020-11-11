var express = require('express');
var router = express.Router();
let customerService= require('../services/CustomerService')

router.get('/',function(req,res){
   res.render('search');
});

router.get('/ls',function(req,res){
    customerService.SearchCustomerVehicle(req.query).then((rows) => {
       res.json(rows);
    });
 });


module.exports = router;