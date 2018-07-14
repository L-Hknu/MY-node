const path = require('path')
const express=require('express')
const bodyParser = require('body-parser')
const session=require('express-session')
const app=express()
app.use(express.static(path.join(__dirname,'statics')))
app.use(bodyParser.urlencoded({extended: false }))
app.use(bodyParser.json())

app.use(session({ secret: 'keyboard cat',resave:true,saveUninitialized: true, cookie: { maxAge: 60000 }}))

const accountRouter=require(path.join(__dirname,'./routers/accountRouter.js'))
const studentmanagerRouter=require(path.join(__dirname,'./routers/studentmanagerRouter.js'))
app.use('/account',accountRouter)
app.use('/studentmanager',studentmanagerRouter)
app.listen(8899,'127.0.0.1', err=>{
     if(err){
       console.log(err);
     }
     console.log('服务器开启');
  });