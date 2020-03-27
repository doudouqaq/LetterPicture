var express = require('express');
var fs = require('fs')
var path = require('path')
var multiparty = require('multiparty')
var child_process = require('child_process');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.options('/image', function (req, res, next) {
  return res.jsonp({
    status: "200",
  })
});

router.post('/image', function (req, res, next) {
  let form = new multiparty.Form();
  var path = require('path');
  form.uploadDir = path.resolve(__dirname, '../public/images');
  form.keepExtensions = true; //是否保留后缀
  form.autoFiels = true; //启用文件事件，并禁用部分文件事件，如果监听文件事件，则默认为true。
  form.parse(req, function (err, fields, files) {  //其中fields表示你提交的表单数据对象，files表示你提交的文件对象
    var resText;
    var pathName = files.file[0].path.split('/'); //linux
    // var pathName = files.file[0].path.split('\\'); //windows

    // console.log(pathName)
    var picName = pathName[pathName.length - 1];
    // console.log(picName)
    
    //运行python脚本
    var workerProcess = child_process.exec('python3 ./public/python/letterPic.py ' + './public/images/' + picName, function (error, stdout, stderr) {
      if (error) {
        console.log(error.stack);
        console.log('Error code: ' + error.code);
        console.log('Signal received: ' + error.signal);
      }
      fs.readFile("./public/python/output.txt", 'utf-8', (err, data) => {
        if (err) throw err;
        resText = data;
        return res.jsonp({
          status: "0",
          msg: "上传成功！",
          resText: resText
        });
      });
    });

    workerProcess.on('exit', function (code) {
      console.log('子进程已退出，退出码 ' + code);
    });
  });

});

module.exports = router;
