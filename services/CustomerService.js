const { promiseImpl } = require('ejs');
let customerRepository = require('../repositories/CustomerRepository');

var lib ={};

// edit data inside permise function and return permise.
lib.GetCustomerList = function(){
 return customerRepository.GetCustomerList().then(([rows,fieldData])=>{
     // rows can be edit and retrun with permise function.
    return rows;
 });
};

lib.GetCustomerVehiucleList = function(vehicleId){
    let values = [vehicleId]
    return customerRepository.GetCustomerVehicleList(values).then(([rows,fieldData])=>{
       return rows;
    });
   };

lib.GetCustomerById = function(id){
    return customerRepository.GetCustomerById(id).then(([rows,fieldData])=>{
       return rows[0];
    });
   };


lib.DeleteCustomer = function(id){
    let values = [id];
    return customerRepository.DeleteCustomer(values).then(([rows,fieldData])=>{
       return [rows,fieldData];
    });
   };

lib.DeleteCustomerVehicle = function (id,parentId) {
    let values = [id,parentId];
    return customerRepository.DeleteCustomerVehicle(values).then(([rows, fieldData]) => {
        return [rows, fieldData];
    });
};
      

lib.SaveCustomer = function(req){
    if (parseInt(req.body.customerId)> 0){
        var values = [req.body.firstName
            , req.body.lastName
            , req.body.email
            , req.body.phonenumber
            , req.body.address
            , req.session.userInfo.iId
            , new Date()
            , parseInt(req.body.customerId)];
        return customerRepository.UpdateCustomer(values);
    } else{
        var values =[
            req.session.userInfo.sTpaCode
           ,req.body.firstName
           ,req.body.lastName
           ,req.body.email
           ,req.body.phonenumber
           ,req.body.address
           ,req.body.country
           ,req.body.state
           ,req.body.zip
           ,req.session.userInfo.iId
       ]
       var vehicleId = parseInt(req.body.vehicleId);
       if (vehicleId > 0) {
        return customerRepository.AddCustomer(values).then(([result])=>{
            values = [result.insertId , vehicleId , req.session.userInfo.iId]
            return customerRepository.AddCustomerVehicle(values);
        }); 
       }else{
           return customerRepository.AddCustomer(values);
       }
        
    } 

}
lib.SearchCustomerVehicle = function(query){
    var values = [query.carid,query.carid,query.name,query.name,query.phone,query.phone];
    return customerRepository.SearchCustomerVehicle(values).then(([rows,fieldData])=>{
       return rows;
    });
   };


module.exports = lib;