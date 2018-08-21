var express = require('express');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
// var multer  = require('multer');

var article = require('./routes/article.js');
var connectme = require('./routes/connectme.js');
var login = require('./routes/login.js');
var music = require('./routes/music.js');
var photo = require('./routes/photo.js');
var weiyu = require('./routes/weiyu.js');
var systemmessage=require('./routes/systemmessage.js');

var app = express();

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})



app.use(express.static(path.resolve(__dirname, './dist')))
app.get('/', function(req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8')
    res.send(html)
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 使用 session 中间件
app.use(session({
    name:'username',
    secret :  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', // 对session id 相关的cookie 进行签名
    resave : true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie : {
        maxAge :1000 * 60 * 10, // 设置 session 的有效时间，单位毫秒
    },
  }));



app.use(function(req, res, next) {
    //不是登录页面或者登录页面的请求，并且session中没有身份验证信息
   
    // console.log(req.headers);
    if(req.path!='/api/Authentication/login'){

            if(req.path.indexOf('Authentication')!=-1){
             
                if(!req.session.userName){
                  return  res.json({code:500,success:true,msg:'未登录或者登陆过期无权访问！'});
                }else{
                    next()
                }
               
            }else{
               
                next()
            }        
   
    }else{
        next()
    }

    });

app.use('/', article);
app.use('/', connectme);
app.use('/', login);
app.use('/', music);
app.use('/', photo);
app.use('/', weiyu);
app.use('/', systemmessage);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    const html = fs.readFileSync(path.resolve(__dirname, './views/err.html'), 'utf-8')
    res.send(html)
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;