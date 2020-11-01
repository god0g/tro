const db = require('../util/database')

const lib = {};

lib.GetCustomerList = function(){
    return db.execute('select * from Customers');
};

lib.GetCustomerById = function(id){
    return db.execute('select * from Customers where iid = ?',[id]);
};


lib.AddCustomer = function(data){
    var sqlText = 'insert into Customers(sTpaCode,sCustFirstName,sCustLastName,sCustEmail,sCustPhoneNumber,sCustAddress1,sCustCountry,sCustState,sCustZip,iInsertUserId) values(?,?,?,?,?,?,?,?,?,?)';
    return db.execute(sqlText,data);
};
lib.UpdateCustomer = function(data){
    var sqlText = `update Customers
    set sCustFirstName = ?
    ,sCustLastName = ?
    ,sCustEmail = ?
    ,sCustPhoneNumber= ?
    ,sCustAddress1=?
    ,iUpdateUserId = ?
    ,dtUpdateTime = ?
    where iId = ?`;
    return db.execute(sqlText,data);
};
lib.DeleteCustomer = function(id){
    var sqlText = 'delete from Customers where iid = ?';
    return db.execute(sqlText,id);
};


module.exports = lib;