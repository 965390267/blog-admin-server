var express = require('express');
var router = express.Router();

/* GET home page. */
var path = require('path');


var formidable = require("formidable");
var fs = require('fs');

// AVATAR_UPLOAD_FOLDER = '/images/',

var media = path.join(__dirname, '../public/media')




router.get('/api/music/', (req, res) => { //获取音乐的接口
    fs.readdir(media, (err, musicnames) => {
        if (err) {
            res.json({ code: 500, success: false, msg:'文件读取图片错误'+ err });
        } 
        if(res) {
            var musicsrc, musicarr = [];
            musicnames.forEach((music) => {
                musicsrc = 'media/' + music;

                musicarr.push({ 'musicpath': musicsrc, 'musicname': music })
            })
            res.json({ code: 200, success: true, msg: '获取音乐成功',data:musicarr });
  
        }
    })

})



router.post('/api/Authentication/uploadmusic', function(req, res) {
    // console.log('req');return;
    var form = new formidable.IncomingForm(); //创建上传表单
    form.encoding = 'utf-8'; //设置编辑
    form.uploadDir = 'public/media/'; //设置上传目录
    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024; //文件大小

    form.parse(req, function(err, fields, files) {

        if (err) {
            res.json({ code: 500, success: false, msg: '音乐上传中间件错误'+err });
        }

        console.log(files.upmusic)
        var extName = ''; //后缀名
        switch (files.upmusic.type) {
            case 'audio/mp3':
                extName = 'mp3';
                break;
            case 'audio/MP3':
                extName = 'mp3';
                break;
            case 'audio/Mp3':
                extName = 'mp3';
                break;
                // default:
                // extName='mp3'
        }

        if (extName.length == 0) {
            
            res.json({ code: 300, success: false, msg: '只支持mp3格式' });
        }


        var newPath = form.uploadDir + files.upmusic.name;
        var musicname = files.upmusic.name;
            //  form.uploadDir + avatarName;
            //显示地址；
            // var showUrl = domain + '/media/' + avatarName;
     
        fs.renameSync(files.upmusic.path, newPath); //重命名
        res.json({code:200,success:true,msg:'音乐列表获取成功',data:{
            "newPath": newPath,
            "musicname": musicname
        }
        });
       
    });
});

module.exports = router;