/**
 * Created by pc on 2017/10/23.
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookies = require('cookies');
var connection = require('./db/connection.js');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(function(req, res, next) {
    //接收来自客户端的cookies
    req.cookies = new cookies(req, res);
    req.userInfo = {
    };
    if (req.cookies.get('userInfo')) {
        try {
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));
            console.log(req.userInfo, '12321213');
            next();
            //. 通过mysql 查
            // User.findById(req.userInfo._id).then(function(userInfo) {
            //     req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
            //     next();
            // })
        } catch(e) {
            next();
        }
    } else {
        next();
    }

});
//设置静态文件。 因为是代理， 所以不需要。
//app.use('/public', express.static(__dirname + '/public'));

//根据不同功能划分功能
app.use('/api', require('./router/api.js')); //后台

connection.connect(function(err) {
    if (err) {
        console.log('[connection connect] - :' + err);
        return;
    }
    console.log('[connection connect] - : success!');
    app.listen(8080);
})
//数据库连接成功。  改成mysql

// mongoose.connect('mongodb://localhost:27018/blog',{useMongoClient:true}, function(err) {
//     if(err) {
//         console.log('fail');
//     } else {
//         console.log('sucess');
//         app.listen(8081);
//     }
// });