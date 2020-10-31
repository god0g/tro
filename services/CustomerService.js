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

lib.SaveCustomer = function(req){
    if (parseInt(req.body.customerId)> 0){
        console.log('edit customer');
        return new Promise(function(resolve,reject){
            return resolve();
        });
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