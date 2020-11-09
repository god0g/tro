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
router.get('/list/:vehicleId',function(req,res){
   let id = parseInt(req.params.vehicleId);
   customerService.GetCustomerVehiucleList(id).then((rows) => {
      res.json(rows);
   });
});

router.post('/delete/:customerId',function(req,res){
   let id = parseInt(req.params.customerId);
   if (id>0) {
      customerService.DeleteCustomer(id).then(() => {
         res.redirect('back');
      });
   }else{  res.redirect('back')};
});

router.post('/disable/:customerId',function(req,res){
   let id = (req.params.customerId);
   let parentId = parseInt(req.body.parentId);
   if (id>0 && parentId>0) {
      customerService.DeleteCustomerVehicle(id , parentId).then(() => {
         res.redirect('back');
      });
   }else{  res.redirect('back')};
});


router.get('/form',function(req,res){
   res.render('form', {
      customerId: 0, customerInfo: customerInfo
   }); 
});

router.get('/form/:customerId',function(req,res){
   let customerInfo = {};
   let id = req.params.customerId;
   if (parseInt(id) > 0) {
      customerInfo = customerService.GetCustomerById(id).then((rows) => {
         if(rows==undefined){rows=customerInfo};
         res.render('form', { customerId: id, customerInfo: rows });
      });
   } else { res.render('form', { customerId: 0, customerInfo: customerInfo }); }

});


router.post('/form', (req, res) => {
   customerService.SaveCustomer(req).then((result) => {
      if (req.body.vehicleId == undefined) {
         res.redirect('/customers');
      } else {     
         res.redirect('back');
      }
   }).catch((err) => { console.log(err) });
});






module.exports = router;