
/**
 * Created by pc on 2017/10/23.
 */
var express = require('express');
var router = express.Router();
var connection = require('../db/connection.js');

var resData = {};
router.use(function(req, res, next) {
     resData = {
        code: 0,
        message: '',
    };
    next();
});

router.get('/login', function(req, res) {
    var username = req.query.name;
    var password = req.query.password;
    console.log(username);
    console.log(password)

    if (username === '' && password === '') {
        resData.code = 1;
        resData.message = '用户名或者密码不能为空';
        res.json(resData);
        return;
    }
    var sql = 'select * from user where name=? and password=?';
    var value = [username, +password];
    connection.query(sql, value, function(err, result) {
        console.log(result);
        if (err || result.length === 0) {
            resData.code = 2;
            resData.message = '用户名或者密码错误';
            res.json(resData);
            return; 
        } else {
            req.cookies.set('userInfo', JSON.stringify({
                username: result[0].name
            }));
            resData.code = 0;
            resData.message = '登陆成功';
            res.json(resData);
            return;
        }
    })
    // resData.code = 0;
    // resData.message = '符合规范';
    // res.json(resData);
    // return;
});
// router.post('/user/login', function(req, res) {
//     var username = req.body.username;
//     var password = req.body.password;
//     if (username === '' && password === '') {
//         resData.code = 1;
//         resData.message = '用户名后者密码不能为空';
//         res.json(resData);
//         return;
//     }
//     User.findOne({
//         username: username,
//         password: password
//     }).then(function(userInfo) {
//         if (!userInfo) {
//             resData.code = 2;
//             resData.message = '用户名或者密码错误';
//             res.json(resData);
//             return;
//         }
//         resData.message = '登录成功';
//         resData.userInfo = {
//             _id: userInfo._id,
//             username: userInfo.username
//         }
//         req.cookies.set('userInfo', JSON.stringify({
//             _id: userInfo._id,
//             username: userInfo.username
//         }));
//         res.json(resData);
//         return;
//     });
// });
// router.get('/user/logout', function(req, res) {
//     req.cookies.set('userInfo', null);
//     res.json(resData);
//     return;
// });
module.exports = router;