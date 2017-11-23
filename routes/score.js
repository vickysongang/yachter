/**
 * Created by songang on 2017/10/27.
 */
/**
 * Created by songang on 2017/10/17.
 */
var express = require('express');
var router = express.Router();
var iconv = require("iconv-lite");
var zlib = require('zlib');
var http = require('http');
var BufferHelper = require('bufferhelper')
var convert = require('../utils/convert.js')
var htmlUtils = require('../utils/htmlUtils.js')
var cheerio = require('cheerio')

var post = function (options, params, callback) {
  var req = http.request(options, function (res) {
    var bufferHelper = new BufferHelper();
    var data, encoding = res.headers['content-encoding'];
    var output;
    // 非gzip/deflate要转成utf-8格式
    if (encoding === 'undefined') {
      res.setEncoding('utf-8');
      output = res;
    } else if (encoding === 'gzip') {
      var gzip = zlib.createGunzip();
      res.pipe(gzip);
      output = gzip;
    } else {
      output = res;
    }
    output.on('data', function (chunk) {
      bufferHelper.concat(chunk);
    });
    output.on('end', function () {
      var result = iconv.decode(bufferHelper.toBuffer(), 'GBK');
      if (result.indexOf('504 Gateway Time-out') === -1) {
        callback(null, params, res.headers, result);
      }
    });
  });
  req.on('error', function (err) {
    callback(err, null, null, null);
  });
  req.on('timeout', function () {
    callback(new Error('请求超时'), null, null, null);
  });
  req.write(params);
  req.end();
};

router.post('/query', function (req, res) {
  var body = req.body
  var params = 'bh=' + convert.utf2gb(body.bh) + '&sfzh=' + body.sfzh
  var options = {
    method: 'POST',
    host: 'tdxl.ruc.edu.cn',
    path: '/cjcx/cjcx_new.asp',
    port: 80,
    headers: {
      'Content-Length': params.length,
      'accept-encoding': 'gzip,deflate',
      'content-type': 'application/x-www-form-urlencoded'
    },
    timeout: 10000
  }
  post(options, params, function (err, args, headers, data) {
    console.log('score err is :', err)
    if (err) {
      res.json({
        code: 1,
        msg: '对不起，服务器内部发生错误！'
      })
      return
    }
    var result = []
    var $ = cheerio.load(data, {
      ignoreWhitespace: true,
      xmlMode: true
    })
    var trs = $('table').children('tr')
    trs.each(function (index) {
      if (index > 0) {
        var item = $(this).text().trim()
        item = item.replace(/( )/g, ",").replace(",,", ",")
        var itemArr = item.split(',')
        if (itemArr.length === 3) {
          result.push({
            subject: itemArr[0],
            score: itemArr[1],
            date: itemArr[2]
          })
        } else if (itemArr.length === 1) {
          result.push({
            subject: itemArr[0],
            score: '',
            date: ''
          })
        }
      }
    })
    if (result.length > 0) {
      res.json({
        code: 0,
        result: result
      })
    } else {
      res.json({
        code: 1,
        msg: '对不起，没有符合条件的考生数据，请重新核实查询条件！'
      })
    }
  });
})

module.exports = router;