var express = require('express');
var path = require('path');
// var proxyMiddleWare = require("http-proxy-middleware");
// var proxyPath = "http://mobilecdn.kugou.com"; //目标后端服务地址
// var proxyOption = { target: proxyPath, changeOrigin: true };

// var proxyPathhash = "http://www.kugou.com"; //目标后端服务地址
// var proxyOptionhash = { target: proxyPathhash, changeOrigin: true };
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
// var multer  = require('multer');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    next()
})


// app.use("/api/v3", proxyMiddleWare(proxyOption)) //这里要注意"/discern" 是匹配的路由,它会将匹配的路由进行转发，没匹配到的就不会转发。('/discern'完全可以写成'/'就是说所有路由都可以访问)

// app.use("/yy", proxyMiddleWare(proxyOptionhash))
    // 静态文件
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

// app.use(multer({ dest: '/images/'}).array('image'));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
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