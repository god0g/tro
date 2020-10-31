var express = require('express');
var router = express.Router();
const db = require('../util/database')


router.get('/',(req,res)=>{
    req.session.destroy();
    res.render('./login');
});

router.post('/', (req, res) => {
    db.execute('select * from SecurityUser where sUserName = ? and sPassword = ?',[req.body.inputEmail,req.body.inputPassword]).then(([rows,fieldData])=>{
        if(rows[0])
        {
            req.session.isLogin = true;
            req.session.userInfo = rows[0];
            res.redirect('./form');
        }else{
            req.session.isLogin = false;
            res.redirect('./login');
        }
    });
});
router.post('/clear', (req, res) => {
   req.session.destroy();
   res.redirect('/');
});



module.exports = router;