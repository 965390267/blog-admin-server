var express = require('express');
var router = express.Router();


router.post('/api/sendmessage', (req, res) => { //留言给我
  
     var message=req.body.message;
     
      res.json({code:200,success:true,msg:'登录失败'});// 若登录失败，重定向到登录页面


});


module.exports = router;
