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
        return customerRepository.AddCustomer(values);
    } 

}



module.exports = lib;