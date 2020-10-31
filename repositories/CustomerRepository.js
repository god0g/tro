const db = require('../util/database')

const lib = {};

lib.GetCustomerList = function(){
    return db.execute('select * from Customers');
};

lib.AddCustomer = function(data){
    var sqlText = 'insert into Customers(sTpaCode,sCustFirstName,sCustLastName,sCustEmail,sCustPhoneNumber,sCustAddress1,sCustCountry,sCustState,sCustZip,iInsertUserId) values(?,?,?,?,?,?,?,?,?,?)';
    return db.execute(sqlText,data);
};


module.exports = lib;