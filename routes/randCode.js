/**
 * Created by songang on 2017/10/17.
 */
var express = require('express');
var superagent = require('superagent');
var router = express.Router();
const URL = 'https://mb345.com/ws/BatchSend2.aspx'
const RANDCODE_USERNAME = 'ZSZM005389'
const RANDCODE_PASSWORD = '123456'

router.post('/send', function (req, res) {
  var body = req.body
  var phone = body.phone
  var code = body.code
  var content = '验证码为：' + code + '【在职小帮手】'
  superagent
    .post(URL)
    .send({
      CorpID: RANDCODE_USERNAME,
      Pwd: RANDCODE_PASSWORD,
      Mobile: phone,
      Content: encodeURIComponent(content)
    })
    .set('content-type', 'application/x-www-form-urlencoded')
    .end(function (err, result) {
      res.json(result)
    })
});


module.exports = router;
