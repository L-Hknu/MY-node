const express =require('express')
const path = require('path')
const studentmanagerRouter = express.Router();
const studentmanagerCTRL=require(path.join(__dirname,'../controllers/studentmanagerController.js'))
studentmanagerRouter.get('/list',studentmanagerCTRL.getStudentListPage)

module.exports = studentmanagerRouter