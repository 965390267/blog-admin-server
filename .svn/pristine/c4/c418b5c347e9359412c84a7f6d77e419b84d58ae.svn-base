// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
//这儿创建链接数据库的方法以及定义数据库的模型，模式
const mongoose = require('mongoose');
// 连接数据库 如果不自己创建 默认test数据库会自动生成
// var dbOptions = {'user':'zangzhihong','pass':'zang2238668'};
// mongoose.connect('mongodb://123.56.216.109:27017/blog',dbOptions);
// mongoose.connect('mongodb://localhost:27017/blog');

mongoose.connect('mongodb://123.56.216.109:27017/blog');
// 为这次连接绑定事件
const db = mongoose.connection; //链接事件
db.once('error', () => console.log('Mongo connection error'));
db.once('open', () => console.log('Mongo connection successed'));
/************** 定义模式loginSchema **************/

const articleschema = new mongoose.Schema({
    id: Number,
    column:String,
    thumbnail:String,
    picsrc: String,
    title: String,
    author: String,
    time:{ type:Number, default:Date.now },
    article: String,
    tag: String,
    submityearandmonth:{ type:Number, default:201801},
    submittime:{ type:Number, default:Date.now},
    visitnumber: { type:Number, default:1 },
    leavemessage:[{username:String,msg:String,time:{ type:Number, default:Date.now},likenums:{ type:Number, default:1},replay:[{username:String,msg:String,time:{ type:Number, default:Date.now}}]}]


}, {
    collection: "article"
})

const weiyuSchema = new mongoose.Schema({
    weiyu: String,
    time: String,
    headimg:String,
    timenumber: Number
}, { collection: 'weiyu' })

const adminSchema = new mongoose.Schema({//底部备案信息模型
    recordid: String,
   
}, { collection: 'admin' })

const commentSchema = new mongoose.Schema({
    tourist: String,
    content: String,

}, { collection: 'comment' })

const loginSchema = new mongoose.Schema({
    username: String,
    password: String,
    time: { type:Date, default:Date.now },
    headimg:String,
    adminname: String,
    visittimes:{ type:Number, default:1 }
}, {
    collection: "login"
})

const photoSchema = new mongoose.Schema({
    imgpath: String
}, {
    collection: 'photolist'
})

const musicSchema = new mongoose.Schema({
    musicpath: String
}, {
    collection: 'musicpath'
})

const Models = {
  
    
    admin: mongoose.model('admin', adminSchema),
    article: mongoose.model('article', articleschema),
    comment: mongoose.model('comment', commentSchema),
    login: mongoose.model('login', loginSchema),
    photo: mongoose.model('photo', photoSchema),
    music: mongoose.model('music', musicSchema),
    weiyu: mongoose.model('weiyu', weiyuSchema)
}


module.exports = Models