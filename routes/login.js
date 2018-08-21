var express = require('express');
var router = express.Router();
var models = require('../datamodel/db.js');
//引入加密模块
var crypto = require('crypto');
/* GET users listing. */

router.get('/api/login', function (req, res) {

    models.login.findById( req.session.userid,(err, data) => {


        if(err){
            res.json({ code: 500, success: false, msg: '数据库读取错误'+err });
        }
        if(data){
            res.json({ code: 200, success: true,data:[{username:data.username,visitnums:data.visittimes}], msg: '获取用户信息成功' });
        }
    })
 
    // res.redirect('/api/login');  
});

router.post('/api/Authentication/login', (req, res) => { //登录提交接口

    var passwd = req.body.password;
    var username = req.body.username;
    var md5 = crypto.createHash('md5');
    //3 digest([encoding])方法计算数据的hash摘要值，encoding是可选参数，不传则返回buff
    var en_data_passwd = md5.update(passwd).digest('hex');

    
    // var admin = new models.login({
    //     username: username,
    //     password: en_data_passwd
    // });
    // // 保存数据newAccount数据进mongoDB
    // admin.save((err, data) => {
    //     if (err) {
    //         res.send(err);
    //     } else {
    //         res.send(data);
    //     }
    // });
    models.login.findOne({
        username: username,
        password: en_data_passwd
    }, (err, data) => {
     
        if(err){
        res.json({ code: 500, success: false, msg:'数据库读取错误'+ err });
        }
        if(data){
          
            var findusername = data.username;
            var findpassword = data.password;
            var login_id=data._id;
            if (req.body.username == findusername && en_data_passwd == findpassword) {
                req.session.userName=findusername;
                req.session.userid=login_id;

var currenttime=new Date();
       var visitnums=data.visittimes;
             visitnums=visitnums+1;
models.login.findByIdAndUpdate(login_id, {visittimes:visitnums,time:currenttime}, function(err, data){
    if (err) {
        res.json({ code: 500, success: false, msg: '服务器数据库错误'+err });
    }
    else {
        res.json({ code: 200, success: true, msg: '登录成功,欢迎第' + data.visittimes + '次访问,登录时间:'+data.time });
    }
})   
            }
            else if (req.body.username != findusername) {

                res.json({ code: 300, success: false, msg: '用户名错误，请重新输入' });// 若登录失败，重定向到登录页面
            } else if (req.body.password != findpassword) {

                res.json({ code: 300, success: false, msg: '密码错误，请重新输入' });// 若登录失败，重定向到登录页面
            }
           
        }
    })
    // var admin = new models.login({
    //     usename: username,
    //     password: en_data_passwd
    // });
    // // 保存数据newAccount数据进mongoDB
    // admin.save((err, data) => {
    //     if (err) {
    //         res.send(err);
    //     } else {
    //         res.send(data);
    //     }
    // });


});

router.get('/api/logout', function (req, res) {

    req.session.userName = null;
    res.json({ code: 200, success: true, msg: '成功退出登录' });
    // res.redirect('/api/login');  
});
module.exports = router;
