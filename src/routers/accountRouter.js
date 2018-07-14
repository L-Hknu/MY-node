const express =require('express')
const path = require('path')
const accountRouter = express.Router();
const accountCTRL=require(path.join(__dirname,'../controllers/accountController.js'))
// 登录
accountRouter.get('/login',accountCTRL.getLoginPage)

//获取图片验证码
accountRouter.get('/vcode',accountCTRL.getImageVcode)
// 注册
accountRouter.get('/register',accountCTRL.getRegisterPage)
// 注册提交
accountRouter.post('/register',accountCTRL.register)
// 登录提交
accountRouter.post('/login',accountCTRL.login)
//导出路由模块(路由中间件)
module.exports = accountRouter