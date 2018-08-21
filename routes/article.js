var express = require('express');
var router = express.Router();
var models = require('../datamodel/db.js');
var fs = require('fs');

var formidable = require("formidable");


// AVATAR_UPLOAD_FOLDER = '/images/',

router.post('/api/Authentication/articleimg', function(req, res) {
    // console.log('req');return;
    var form = new formidable.IncomingForm(); //创建上传表单
    form.encoding = 'utf-8'; //设置编辑
    form.uploadDir = 'public/articleimg/'; //设置上传目录
    form.keepExtensions = true; //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024; //文件大小

    form.parse(req, function(err, fields, files) {

        if (err) {
            res.json({ code: 500, success: false, msg: '图片上传中间件错误'+err });
        }
        //    console.log(files.uploadarticleimg.name)

        var extName = ''; //后缀名
        switch (files.uploadarticleimg.type) {
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
            res.json({ code: 300, success: false, msg: '只支持png和jpg格式图片' });
       
        }

        // var avatarName = Math.random() + '.' + extName;
        //图片写入地址；
        var newPath = form.uploadDir + files.uploadarticleimg.name;
        var imgname = files.uploadarticleimg.name;
        //显示地址；
        // var showUrl = domain + '/images/' + avatarName;
        // console.log("newPath", newPath);
        fs.renameSync(files.uploadarticleimg.path, newPath); //重命名
        res.json({code:200,success:true,msg:'图片上传成功',data:{
            "newPath": 'articleimg/' + imgname,
            "imgname": imgname
        }
        });
    });

});

router.post('/api/viewarticlenums', (req, res, next) => {//文章观看次数提交获取窗口
    
    var getid=req.body.artid;
 
    models.article.findById(getid,(err,doc)=>{
        var visitnums=doc.visitnumber;
        visitnums++;
   
        models.article.findByIdAndUpdate(getid, {visitnumber:visitnums}, function(err, data){
            if (err) {
                res.json({ code: 500, success: false, msg: '服务器数据库错误'+err });
            }
            else {
                res.json({ code: 200, success: true, msg: '观看次数提交成功',data:data });
            }
        })   

   
})
})
router.post('/api/getarticle', (req, res, next) => { //获取文章的接口
    // var pageSize = 5;                   //一页多少条
    // var currentPage = 1;                //当前第几页
    // var sort = {'logindate':-1};        //排序（按登录时间倒序）
    // var condition = {};                 //条件
    // var skipnum = (currentPage - 1) * pageSize;   //跳过数
    // User.find(condition).skip(skipnum).limit(pageSize).sort(sort).exec(function (err, res) {
    //     if (err) {
    //         console.log("Error:" + err);
    //     }
    //     else {
    //         console.log("Res:" + res);
    //     }
    // })
 // var pageSize = 5;                  
    // var currentPage = 1;               
    var pageSize =req.body.pageSize; //一页多少条
    var currentPage = req.body.currentPage;  //当前第几页
    var skipnum = (currentPage - 1) * pageSize;   //跳过数
  
    models.article.find((err, doc) => {
        if (err) {
            res.json({code:500,success:false,msg:'获取文章失败信息',data:err});
        } 
        if(doc) {
            models.article.count((err, data) => {
                if (err) {
                    res.json({code:500,success:false,msg:'获取文章数量失败',data:err});
                } 
                if(doc) {
        
                    res.json({code:200,success:true,msg:'获取文章成功信息',count:data, data:doc});
                }
            })
       
        }
    }).skip(skipnum).limit(pageSize).sort({ submittime: -1 })
})

router.get('/api/getarticlemostnew', (req, res, next) => { //获取最新6篇文章的接口
  
   
    models.article.find((err, data) => {
        if (err) {
            res.json({code:500,success:false,msg:'获取最新文章失败信息',data:err});
        } 
        if(data) {

            res.json({code:200,success:true,msg:'获取最新文章成功信息',data:data});
        }
    }).limit(6).sort({ submittime: -1 })
})

router.get('/api/getarticlemosthot', (req, res, next) => { //获取最热，观看次数最多的6篇文章的接口
  
   
    models.article.find((err, data) => {
        if (err) {
            res.json({code:500,success:false,msg:'获取最热文章失败信息',data:err});
        } 
        if(data) {

            res.json({code:200,success:true,msg:'获取最热文章成功信息',data:data});
        }
    }).limit(6).sort({ visitnumber: -1 })
})

router.get('/api/getarticlenums', (req, res, next) => { //获取文章的总篇数接口
  
   
    models.article.count((err, data) => {
        if (err) {
            res.json({code:500,success:false,msg:'获取文章数量失败',data:err});
        } 
        if(data) {

            res.json({code:200,success:true,msg:'获取文章数量成功',data:data});
        }
    })
})

router.post('/api/getarticlebyid', (req, res, next) => { //通过ID获取文章的接口
  
    var id=req.body.id;
    console.log(id);
    
    models.article.findById(id,(err, data) => {
        if (err) {
            res.json({code:500,success:false,msg:'获取文章失败信息',data:err});
        } 
        if(data) {

            res.json({code:200,success:true,msg:'获取文章成功信息',data:data});
        }
    })
})

router.get('/api/getarticlefile', (req, res, next) => { //获取文章存档的接口,采用MongoDB的聚合操作对数据进行统计,使用方法—根据_id的值查找相关的数量统计给num_s
    models.article.aggregate([{ $group: { _id: "$submityearandmonth",num_s: { $sum: 1 } } }],(err,doc)=>{
      
        if (err) {
                    res.json({code:500,success:false,msg:'获取文章存档失败信息',data:err});
                } 
                res.json({code:200,success:true,msg:'获取文章存档成功信息',data:doc});
            }
    )
  
  
  
})

router.get('/api/getaboutarticle', (req, res, next) => { //获取文章相关文档的接口
    models.article.aggregate([{ $group: { _id: "$submityearandmonth",abouts:{$push:"$title"},aboutsid:{$push:"$_id"} } }],(err,doc)=>{
      
        if (err) {
                    res.json({code:500,success:false,msg:'获取文章存档失败信息',data:err});
                } 
                res.json({code:200,success:true,msg:'获取文章存档成功信息',data:doc});
            }
    )
  
  
  
})

router.get('/api/getarticleclass', (req, res, next) => { //获取文章分类的接口
    models.article.aggregate([{ $group: { _id: "$title", num_s: { $sum: 1 } } }],(err,doc)=>{
      
        if (err) {
                    res.json({code:500,success:false,msg:'获取文章分类失败信息',data:err});
                } 
                res.json({code:200,success:true,msg:'获取文章分类成功',data:doc});
            }
    )
  
  
  
})

router.get('/api/getarticletag', (req, res, next) => { //获取文章标签的接口
    models.article.aggregate([{ $group: { _id: "$tag", num_s: { $sum: 1 } } }],(err,doc)=>{
      
        if (err) {
                    res.json({code:500,success:false,msg:'获取文章标签失败信息',data:err});
                } 
                res.json({code:200,success:true,msg:'获取文章标签成功',data:doc});
            }
    )
  
  
  
})

router.post('/api/Authentication/deletearticle', (req, res, next) => {
    console.log(req.body.artid);

    var conditions = { '_id': req.body.artid }
    models.article.remove(conditions, (err,data) => {
        if (err) {
            res.json({code:500,success:false,msg:'删除文章数据库失败'+err});
        } 
        if(data) {
            res.json({code:200,success:true,msg:'删除文章成功',data:''});
        }
    })
})



router.post('/api/Authentication/createarticle', (req, res) => { //发送文章的接口
    // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
    var newtime = new Date(req.body.time).getTime()
    var submityear=new Date(req.body.time).getFullYear();
    var  submitmonth=new Date(req.body.time).getMonth()+1;
    if(submitmonth<10){
        submitmonth='0'+submitmonth
    }
    submitmonth=submitmonth.toString()
   
    var submityearandmonth=Number((submityear+submitmonth));
    console.log(submityearandmonth);
    var newAccount = new models.article({
        tag: req.body.tag,
        column: req.body.column,
        thumbnail: req.body.thumbnail,
        picsrc: req.body.picsrc,
        author: req.body.author,
        time: req.body.time,
        title: req.body.title,
        article: req.body.article,
        timenumber: newtime,
        submityearandmonth: submityearandmonth,
       
    });



    // 保存数据newAccount数据进mongoDB
    newAccount.save((err, data) => {
        if (err) {
            res.json({code:500,success:false,msg:'文章提交数据库失败'+err});
        } 
        if(data) {
            res.json({code:200,success:true,msg:'文章提交成功',data:err});
        }
    });
});



router.post('/api/putlikenums', (req, res) => { //文章给赞数量统计的接口,先通过id找到文章，然后在通过回复的id找到相应的回复内容，不能直接通过回复id找到内层对象
    var article_id=req.body.id;
    var recieve_id=req.body.recieveid;
    var dbindex=req.body.dbindex;
    console.log(article_id);
   
models.article.findById(article_id,(err,data)=>{
    if(data){
        console.log(data);
        console.log(err);
        var likes= data.leavemessage[dbindex].likenums;
        likes++
        console.log(likes);
        var comment= [{"likenums":likes}];
      
    models.article.findByIdAndUpdate(article_id,{$set:{leavemessage:comment}}, function(err, data){
        if (err) {
            res.json({ code: 500, success: false, msg: '服务器数据库错误'+err });
        }
        else {
            res.json({ code: 200, success: true, msg: '文章给赞数量增加成功',data:[data.leavemessage[dbindex].likenums] });
        }
    }) 
    }else{
        res.json({ code: 500, success: false, msg: '服务器数据库错误'+err });
    }


})


})


router.post('/api/createcomment', (req, res) => { //文章评论的接口
    var article_id=req.body.id;
  var username=req.body.username;
  var msg=req.body.msg;
  console.log(username);
 
   var comment = new models.article({
       leavemessage:[{  "username":username,"msg":msg }]
      
})
comment.save(function(err, data){
        if (err) {
            res.json({ code: 500, success: false, msg: '服务器数据库错误'+err });
        }
        else {
          
            
            res.json({ code: 200, success: true, msg: '文章评论提交成功',data:data });
        }
    })   
        


})

router.post('/api/createcomment', (req, res) => { //文章评论回复的接口
    var article_id=req.body.id;
    
   var comment= [{username:'zzh',msg:'ninhao',likenums:50,replay:[{username:'min',msg:'555'}]}]
    models.article.findByIdAndUpdate(article_id, {leavemessage:comment}, function(err, data){
        if (err) {
            res.json({ code: 500, success: false, msg: '服务器数据库错误'+err });
        }
        else {
            console.log(data);
            
            res.json({ code: 200, success: true, msg: '文章评论提交成功',data:data });
        }
    })   
        


})

module.exports = router;