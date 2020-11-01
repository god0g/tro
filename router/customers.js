var express = require('express');
var router = express.Router();
let customerService= require('../services/CustomerService')

var customerInfo = {
   iId: 0,
   sCustFirstName: null,
   sCustLastName: null,
   sCustEmail: null,
   sCustPhoneNumber: null,
   sCustAddress1: null,
   sCustCountry: null,
   sCustState:null,
   sCustZip: null
};

router.get('/',function(req,res){
   res.render('listcustomer');
});

router.get('/list',function(req,res){
   customerService.GetCustomerList().then((rows) => {
      res.json(rows);
   });
});

router.post('/delete/:customerId',function(req,res){
   let id = parseInt(req.params.customerId);
   if (id>0) {
      customerService.DeleteCustomer(id).then(() => {
         res.redirect('/customers');
      });
   }else{  res.redirect('/customers');};
});


router.get('/form',function(req,res){
   res.render('form', {
      customerId: 0, customerInfo: customerInfo
   }); 
});

router.get('/form/:customerId',function(req,res){
   let customerInfo = {};
   console.log(req.params.customerId);
   let id = req.params.customerId;
   if (parseInt(id) > 0) {
      customerInfo = customerService.GetCustomerById(id).then((rows) => {
         if(rows==undefined){rows=customerInfo};
         console.log(rows);
         res.render('form', { customerId: id, customerInfo: rows });
      });
   } else { res.render('form', { customerId: 0, customerInfo: customerInfo }); }

});


router.post('/form', (req, res) => {
   customerService.SaveCustomer(req).then(() => {
       res.redirect('/customers');
   }).catch((err) => { console.log(err) });
});






module.exports = router;