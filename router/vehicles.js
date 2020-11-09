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
          console.log(rows);
          res.render('vehicleform', { vehicleId: id, vehicleInfo: rows });
       });
    } else { res.render('vehicleform', { vehicleId: 0, vehicleInfo: vehicleInfo }); }
 
 });
 
 router.post('/form', (req, res) => {
    vehicleService.SaveVehicle(req).then(() => {
        res.redirect('/Vehicles');
    }).catch((err) => { console.log(err) });
 });
 
  

 module.exports = router;