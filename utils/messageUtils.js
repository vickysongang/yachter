/**
 * Created by songang on 2017/11/7.
 */
var superagent = require('superagent');

function sendTextMessage(content, data, access_token, callback) {
  superagent
    .post('https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=' + access_token)
    .send({
      touser: data.FromUserName,
      msgtype: "text",
      text: {
        content: content
      }
    })
    .set('content-type', 'application/x-www-form-urlencoded')
    .end(function (err, result) {
      callback(err, result)
    })
}

function sendImageMessage(media_id, data, access_token, callback) {
  superagent
    .post('https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=' + access_token)
    .send({
      touser: data.FromUserName,
      msgtype: "image",
      image: {
        media_id: media_id
      }
    })
    .set('content-type', 'application/x-www-form-urlencoded')
    .end(function (err, result) {
      callback(err, result)
    })
}

module.exports = {
  sendTextMessage: sendTextMessage,
  sendImageMessage: sendImageMessage
}