const captchapng = require("captchapng");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";
const dbName = "Study";
let   vcode=null
exports.getLoginPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/login.html"));
};
// 验证码
exports.getImageVcode = (req, res) => {
  const vcode = parseInt(Math.random() * 9000 + 1000);
  req.session.vcode=vcode

  var p = new captchapng(80, 30,vcode); // width,height,numeric captcha
  p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
  p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

  var img = p.getBase64();
  var imgbase64 = new Buffer(img, "base64");
  res.writeHead(200, {
    "Content-Type": "image/png"
  });
  res.end(imgbase64);
};

exports.getRegisterPage = (req, res) => {
  res.sendFile(path.join(__dirname, "../views/register.html"));
};

exports.register = (req, res) => {
  const result = { status: 0, message: "注册成功" };
  const { username } = req.body;
  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, client) {
      const db = client.db(dbName);
      const collection = db.collection("account");
      collection.findOne({ username }, (err, doc) => {
        if (doc != null) {
          //存在
          result.status = 1;
          result.message = "用户名已经存在!";

          client.close();
          res.json(result);
        } else {
          //不存在
          collection.insertOne(req.body, (err, result1) => {
            if (result1 == null) {
              result.status = 2;
              result.message = "注册失败!";
            }
            client.close();
            res.json(result);
          });
        }
      });
    }
  );
};


exports.login = (req,res)=>{

    const result={status:0,message:'登录成功'}
    if(req.session.vcode!=req.body.vcode){
        result.status=1
        result.message='登录失败'
        res.json(result)
        return
    }
    
    MongoClient.connect(url,function(err,client){
        const db=client.db(dbName)
        const collection=db.collection('account')
        
        collection.findOne({
            username:req.body.username,
            password:req.body.password
        },(err,doc)=>{
            if(doc=null){
                result.status = 2
                result.message = "用户名或密码错误"
            }
            res.json(result)
            client.close();
        })
    })


}