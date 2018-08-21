var express = require('express');
var router = express.Router();
var models = require('../datamodel/db.js');

router.get('/api/systemmessage', (req, res) => { //浏览器信息
 
     var agent=req.headers["user-agent"];
      res.json({code:200,success:true,msg:'浏览器信息',data:[{'agent':agent},{'loginip':req.ip},{'hostname':req.host}]});// 浏览器信息


});
router.get('/api/recordid', (req, res) => { //获取底部备案信息
  
     models.admin.findOne({
        recordid: req.body.recordmes    
    }, (err, data) => {
        if (err) {
            res.send({code:500,success:false,msg:'数据库错误'+err})
        } 
        if(data) {
           
            res.json({code:200,success:true,msg:'获取备案信息成功',data:[{'record':data}]});// 获取备案信息成功
        }
    })
  


});
router.post('/api/Authentication/recordid', (req, res) => { //提交底部备案信息
    var newrecordid = new models.admin({
        recordid: req.body.tag,
    });
    var agent=req.data.name;
    // 保存数据newAccount数据进mongoDB
    newrecordid.save((err, data) => {
        if (err) {
            res.json({code:500,success:false,msg:'数据库错误'+err})
        } 
        if(data) {
            res.json({code:200,success:true,msg:'备案信息提交成功',data:[{'agent':agent}]});// 备案信息提交成功
        }
    });
  
    


});
module.exports = router;
