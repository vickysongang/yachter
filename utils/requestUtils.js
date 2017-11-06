/**
 * Created by songang on 2017/11/7.
 */
/**
 * Created by songang on 2017/10/17.
 */
var superagent = require('superagent');
var APPID = 'wx493583df6c66012e'
var SECRET = 'd15a6b79e9417a9f9824f1a71b8e8f8c'
var AUTH_URL = 'https://api.weixin.qq.com/sns/jscode2session'
var ACCESS_TOKEN_URL = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential'

function requestOpenId(code, callback) {
  //调用request请求api转换登录凭证
  var url = AUTH_URL + '?appid=' + APPID + '&secret=' + SECRET + '&grant_type=authorization_code&js_code=' + code
  superagent
    .get(url)
    .set('content-type', 'application/json')
    .end(function (err, result) {
      callback(err, result)
    })
}

function requestAccessToken(callback) {
  var url = ACCESS_TOKEN_URL + '&appid=' + APPID + '&secret=' + SECRET
  console.log('urlurlurl:', url)
  superagent
    .get(url)
    .set('content-type', 'application/json')
    .end(function (err, result) {
      console.log('result:', result.body)
      callback(err, result)
    })
}

module.exports = {
  requestOpenId: requestOpenId,
  requestAccessToken: requestAccessToken
}