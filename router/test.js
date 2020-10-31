var express = require('express');
var router = express.Router();


router.get('/test',function(req,res){
    res.render('test',{test:'execute form'});
});
router.post('/test', function (req, res) {
    console.log(req.body);
    var objTest = {
        name: req.body.name,
        surname: req.body.surname
    }
    res.send('send from post test ' + JSON.stringify(objTest));

});


module.exports = router;