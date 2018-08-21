var express = require('express');
var router = express.Router();

/* GET Photo page. */
var path = require('path');

var photo = path.join(__dirname, '../public/images')

var fs = require('fs');

var formidable = require("formidable");


// AVATAR_UPLOAD_FOLDER = '/images/',

router.get('/api/photo', (req, res) => {
    fs.readdir(photo, (err, photolist) => {
        if (err) {
            res.json({code:500,success:false,msg:'fs中间件错误'+err})
        } 
        if(res) {
            var photosrc, photoarr = [];
            photolist.forEach((photo) => {
                photosrc = 'images/' + photo;

                photoarr.push({ 'photopath': photosrc, 'photoname': photo })
            })
            // var sess = req.session//用这个属性获取session中保存的数据，而且返回的JSON数据
            // if (sess.views) {
            //     sess.views++
            //     // res.setHeader('Content-Type', 'text/html')
            //     res.json({'guankancishu':'欢迎第' + sess.views + '次访问'})
            //     // res.write('<p>欢迎第 ' + sess.views + '次访问       ' + 'expires in:' + (sess.cookie.maxAge / 1000) + 's</p>')
            //     // res.end();
            //   } else {
            //     sess.views = 1
            //    res.json({'guankancishu':'欢迎第一次访问'})
            //   }
            
        
            res.json({code:200,success:true,msg:'图片集请求成功',piclist:photoarr})
        }
    })
})

router.post('/api/Authentication/deletephoto',(req,res)=>{//相册删除接口

    fs.unlink('public/images/'+req.body.photoname,()=>{
        res.json({code:200,success:true,msg:'图片删除成功'})
    }) 
    
    })
    
    router.post('/api/Authentication/uploadimg', function(req, res) {
        // console.log('req');return;
        var form = new formidable.IncomingForm(); //创建上传表单
        form.encoding = 'utf-8'; //设置编辑
        form.uploadDir = 'public/images/'; //设置上传目录
        form.keepExtensions = true; //保留后缀
        form.maxFieldsSize = 2 * 1024 * 1024; //文件大小
    
        form.parse(req, function(err, fields, files) {
    
            if (err) {
                res.json({ code: 500, success: false, msg: '图片上传中间件错误'+err });
            }
            console.log(files.upimg.name)
    
            var extName = ''; //后缀名
            switch (files.upimg.type) {
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
              
                res.json({ code: 300, success: true, msg: '只支持png和jpg格式图片' });
            }
    
            // var avatarName = Math.random() + '.' + extName;
            //图片写入地址；
            var newPath = form.uploadDir + files.upimg.name;
            var imgname=files.upimg.name;
            //显示地址；
            // var showUrl = domain + '/images/' + avatarName;
            console.log("newPath", newPath);
            fs.renameSync(files.upimg.path, newPath); //重命名
            res.json({code:200,success:true,msg:'图片列表获取成功',data:{
                "newPath": newPath,
                "imgname":imgname
            }
            });
           
        });
    
    });
    
module.exports = router;