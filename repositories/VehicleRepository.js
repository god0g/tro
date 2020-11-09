const db = require('../util/database')

const lib = {};

lib.GetVehicleList = function(){
    return db.execute('select * from Vehicles');
};

lib.GetVehicleById = function(id){
    return db.execute('select * from Vehicles where iid = ?',[id]);
};


lib.AddVehicle = function(data){
    var sqlText = `insert into Vehicles (sTpaCode,sType,sBrand,sModel,sVin,sRegistrationNumber,iInsertUserId,dtInsertTime)
                                  values(?,?,?,?,?,?,?,?)`;
    return db.execute(sqlText,data);
};
lib.UpdateVehicle = function(data){
    var sqlText = `update Vehicles
    set sType = ?
    , sBrand = ?
    , sModel = ?
    , sVin = ?
    , sRegistrationNumber = ?
    , iUpdateUserId = ?
    , dtUpdateTime = ?
    where iId = ?`;
    return db.execute(sqlText,data);
};
lib.DeleteVehicle = function(id){
    var sqlText = 'delete from Vehicle where iid = ?';
    return db.execute(sqlText,id);
};


module.exports = lib;