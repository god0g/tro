var express = require('express');
var router = express.Router();
let vehicleService= require('../services/VehicleService')


var vehicleInfo = {
    iId: 0,
    sType: null,
    sVin: null,
    sRegistrationNumber: null,
    sModel: null,
    sBrand: null,
 };
 
 router.get('/',function(req,res){
    res.render('listvehicle');
 });
 
 router.get('/list',function(req,res){
    vehicleService.GetVehicleList().then((rows) => {
       res.json(rows);
    });
 });
 

 router.get('/form',function(req,res){
    res.render('vehicleform', {
       vehicleId: 0, vehicleInfo: vehicleInfo
    }); 
 });
 router.get('/form/:vehicleId',function(req,res){
    let id = req.params.vehicleId;
    if (parseInt(id) > 0) {
        vehicleInfo = vehicleService.GetVehicleById(id).then((rows) => {
          if(rows==undefined){rows=vehicleInfo};
          res.render('vehicleform', { vehicleId: id, vehicleInfo: rows });
       });
    } else { res.render('vehicleform', { vehicleId: 0, vehicleInfo: vehicleInfo }); }
 
 });
 
 router.post('/form', (req, res) => {
    vehicleService.SaveVehicle(req).then(([result]) => {
      if (parseInt(req.body.vehicleId)> 0){
         res.redirect('/Vehicles/form/'+req.body.vehicleId);
      }else{
         if (parseInt(result.insertId)> 0){
            res.redirect('/Vehicles/form/'+result.insertId);
         }else{
            res.redirect('/Vehicles');
         }
      }
    }).catch((err) => { console.log(err) });
 });
 router.post('/delete/:vehicleId',function(req,res){
   let id = parseInt(req.params.vehicleId);
   if (id>0) {
      vehicleService.DeleteVehicle(id).then(() => {
         res.redirect('back');
      });
   }else{  res.redirect('back')};
});

  

 module.exports = router;