const { promiseImpl } = require('ejs');
let vehicleRepository = require('../repositories/VehicleRepository');

var lib ={};

// edit data inside permise function and return permise.
lib.GetVehicleList = function(){
 return vehicleRepository.GetVehicleList().then(([rows,fieldData])=>{
     // rows can be edit and retrun with permise function.
    return rows;
 });
};


lib.GetVehicleById = function(id){
    return vehicleRepository.GetVehicleById(id).then(([rows,fieldData])=>{
       return rows[0];
    });
   };


lib.DeleteVehicle = function(id){
    let values = [id];
    return vehicleRepository.DeleteVehicle(values).then(([rows,fieldData])=>{
       return [rows,fieldData];
    });
   };
   

lib.SaveVehicle= function(req){
    if (parseInt(req.body.vehicleId)> 0){
        var values = [req.body.vehicleType
            , req.body.vehicleBrand
            , req.body.model
            , req.body.vin
            , req.body.registrationNumber
            , req.session.userInfo.iId
            , new Date()
            , parseInt(req.body.vehicleId)];
        return vehicleRepository.UpdateVehicle(values);
    } else{
        var values =[
            req.session.userInfo.sTpaCode
           ,req.body.vehicleType
           ,req.body.vehicleBrand
           ,req.body.model
           ,req.body.vin
           ,req.body.registrationNumber
           ,req.session.userInfo.iId
           , new Date()
       ]
        return vehicleRepository.AddVehicle(values);
    } 

}



module.exports = lib;