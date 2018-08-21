var express = require('express');
var router = express.Router();
var models = require('../datamodel/db.js');

var fs = require('fs');


var formidable = require("formidable");




router.post('/api/Authentication/postweiyu', (req, res) => {

    var newtime = new Date(req.body.time).getTime()
    console.log(newtime)
    var newweiyu = new models.weiyu({
        weiyu: req.body.weiyu,
        time: req.body.time,
        headimg: req.body.headimg,
        timenumber: newtime
    })
    newweiyu.save((err, data) => {
        if (err) {
            res.json({code:500,success:false,msg:'数据库错误'+err});
        } 
        if(data) {
            res.json({code:200,success:true,msg:'微语提交成功',data:data});
        }
    })
})

router.get('/api/getweiyu', (req, res, next) => { //获取微语的接口


    models.weiyu.find((err, data) => {
        if (err) {
            res.json({code:500,success:false,msg:'数据库错误'+err});
        } 
        if(data) {
            res.json({code:200,success:true,msg:'微语获取成功',data:data});
        }
    }).sort({ timenumber: -1 })
});

router.get('/api/getthreeweiyu', (req, res, next) => { //获取3条微语的接口


    models.weiyu.find((err, data) => {
        if (err) {
            res.json({code:500,success:false,msg:'数据库错误'+err});
        } 
        if(data) {
            res.json({code:200,success:true,msg:'微语获取成功',data:data});
        }
    }).limit(3).sort({ timenumber: -1 })
});

router.post('/api/Authentication/deleteweiyu', (req, res, next) => {
    console.log(req.body.weiyuid);

    var conditions = { '_id': req.body.weiyuid }
    models.weiyu.remove(conditions, (err) => {
        if (err) {
            res.json({code:500,success:false,msg:'数据库错误'+err});
        } 
        if(data) {
            res.json({code:200,success:true,msg:'微语删除成功'});
        }
    })
})

router.post('/api/Authentication/weiyuimg', function(req, res) { //微语的标题图片上传
    // console.log('req');return;
    var form = new formidable.IncomingForm(); //创建上传表单
    form.encoding = 'utf-8'; //设置编辑
    form.uploadDir = 'public/weiyuimg/'; //设置上传目录
    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024; //文件大小

    form.parse(req, function(err, fields, files) {

        if (err) {
            res.json({code:500,success:false,msg:'服务器错误'+err});
        }
        //    console.log(files.uploadarticleimg.name)

        var extName = ''; //后缀名
        switch (files.upweiyuimg.type) {
            case 'images/jpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
                // default:
                // extName='unknow'
        }

        if (extName.length == 0) {
            res.json({code:300,success:false,msg:'只支持png和jpg格式图片'});
          
        }

        // var avatarName = Math.random() + '.' + extName;
        //图片写入地址；
        var newPath = form.uploadDir + files.upweiyuimg.name;
        var imgname = files.upweiyuimg.name;
        //显示地址；
        // var showUrl = domain + '/images/' + avatarName;
        // console.log("newPath", newPath);
        fs.renameSync(files.upweiyuimg.path, newPath); //重命名
        res.json({code:200,success:true,msg:'微语图片上传成功',data:{
            "newPath": 'weiyuimg/' + imgname,
            "imgname": imgname
        }
        });
      
    });

});

module.exports = router;