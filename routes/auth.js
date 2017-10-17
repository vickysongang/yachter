/**
 * Created by songang on 2017/10/17.
 */
var express = require('express');
var superagent = require('superagent');
var router = express.Router();
var APPID = 'wx493583df6c66012e'
var SECRET = 'd15a6b79e9417a9f9824f1a71b8e8f8c'
var AUTH_URL = 'https://api.weixin.qq.com/sns/jscode2session'

router.post('/', function (req, res) {
  var body = req.body
  var code = body.code
  //调用request请求api转换登录凭证
  var url = AUTH_URL + '?appid=' + APPID + '&secret=' + SECRET + '&grant_type=authorization_code&js_code=' + code
  superagent
    .get(url)
    .set('content-type', 'application/json')
    .end(function (err, result) {
      res.json(result)
    })
});


module.exports = router;