const db = require('../util/database')

const lib = {};

lib.GetCustomerList = function(){
    return db.execute('select * from Customers');
};
lib.GetCustomerVehicleList = function(data){
    var sqlText = `select c.* from Customers c
                    join CustomerVehicles cv on c.Iid = cv.iCustomerId
                    where cv.iVehicleId = ?`
    return db.execute(sqlText,data);
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
    var sqlText = `delete cv,c
                   from Customers c
                   left join CustomerVehicles cv ON cv.iCustomerId = c.iId
                   where c.iId = ?`;
    return db.execute(sqlText,id);
};
lib.AddCustomerVehicle = function(data){
    var sqlText = `insert into CustomerVehicles(iCustomerId,iVehicleId,iInsertUserId)
                   values (?,?,?)`;
    return db.execute(sqlText,data);
};
lib.DeleteCustomerVehicle = function(data){
    var sqlText = `delete from CustomerVehicles
                   where iCustomerId = ? and iVehicleId = ?`;
    return db.execute(sqlText,data);
};

lib.SearchCustomerVehicle = function(data){
    var sqlText = `select v.sRegistrationNumber,concat(c.sCustFirstName ,' ', c.sCustFirstName) as sCustName,c.sCustPhoneNumber
    from CustomerVehicles cv
    join Customers c on cv.iCustomerId = c.iId
    join Vehicles v on cv.iVehicleId = v.iId
    where (v.sRegistrationNumber like concat('%',?,'%') or ? = '')
    and (c.sCustFirstName like concat('%',?,'%') or ? = '')
    and (c.sCustPhoneNumber like concat('%',?,'%') or ? = '')`
    return db.execute(sqlText,data);
};
module.exports = lib;