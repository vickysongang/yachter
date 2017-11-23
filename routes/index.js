var express = require('express');
var router = express.Router();
var dbUtils = require('../utils/dbUtils')
var messageUtils = require('../utils/messageUtils')
var requestUtils = require('../utils/requestUtils')
var dbSqls = require('../utils/dbSqls')
var crypto = require('crypto')
var xml2js = require('xml2js')

router.get('/', function (req, res) {
  return dbUtils.getDBConnection(function (err, conn) {
    conn.query('SELECT 1 + 1 AS solution', function (err, rows, fileds) {
      res.json({rows: rows, fileds: fileds})
      res.end();
      conn.release();
    })
  })
});

router.all('/schools', function (req, res) {
  return dbUtils.getDBConnection(function (err, conn) {
    conn.query(dbSqls.QUERY_SCHOOLS_SQL, function (err, result) {
      if (err) {
        res.json({
          code: -1,
          msg: err
        })
      } else {
        res.json(result)
      }
      res.end();
      conn.release();
    })
  })
});

router.all('/school/detail', function (req, res) {
  var body = req.body
  var params = [body.schoolId]
  return dbUtils.getDBConnection(function (err, conn) {
    conn.query(dbSqls.GET_SCHOOL_DETAIL, params, function (err, result) {
      if (err) {
        res.json({
          code: -1,
          msg: err
        })
      } else {
        res.json(result)
      }
      res.end();
      conn.release();
    })
  })
});

router.post('/colleges', function (req, res) {
  var body = req.body
  var params = [body.schoolId]
  return dbUtils.getDBConnection(function (err, conn) {
    conn.query(dbSqls.QUERY_COLLEGES_SQL, params, function (err, result) {
      if (err) {
        res.json({
          code: -1,
          msg: err
        })
      } else {
        res.json(result)
      }
      res.end();
      conn.release();
    })
  })
});

router.post('/majors', function (req, res) {
  var body = req.body
  var params = [body.collegeId]
  return dbUtils.getDBConnection(function (err, conn) {
    conn.query(dbSqls.QUERY_MAJORS_SQL, params, function (err, result) {
      if (err) {
        res.json({
          code: -1,
          msg: err
        })
      } else {
        res.json(result)
      }
      res.end();
      conn.release();
    })
  })
});

router.all('/years', function (req, res) {
  return dbUtils.getDBConnection(function (err, conn) {
    conn.query(dbSqls.QUERY_YEARS_SQL, function (err, result) {
      if (err) {
        res.json({
          code: -1,
          msg: err
        })
      } else {
        res.json(result)
      }
      res.end();
      conn.release();
    })
  })
});

router.all('/classes', function (req, res) {
  var body = req.body
  var sql = dbSqls.QUERY_ALL_CLASSES_SQL
  if (body.type === 'default') {
    sql = dbSqls.QUERY_DEFAULT_CLASSES_SQL
  }
  return dbUtils.getDBConnection(function (err, conn) {
    conn.query(sql, function (err, result) {
      if (err) {
        res.json({
          code: -1,
          msg: err
        })
      } else {
        res.json(result)
      }
      res.end();
      conn.release();
    })
  })
});

router.post('/class/insert', function (req, res) {
  var body = req.body
  return dbUtils.getDBConnection(function (err, conn) {
    var params = [
      body.name,
      'custom'
    ]
    conn.query(dbSqls.INSERT_CLASS_SQL, params, function (err, result) {
      if (err) {
        res.json({
          code: -1,
          msg: err
        })
      } else {
        res.json({
          id: result.insertId
        })
      }
      conn.release();
    })
  })
});

router.all('/class/query', function (req, res) {
  var body = req.body
  var params = [
    body.name
  ]
  return dbUtils.getDBConnection(function (err, conn) {
    conn.query(dbSqls.QUERY_CLASS_BYNAME_SQL, params, function (err, result) {
      if (err) {
        res.json({
          code: -1,
          msg: err
        })
      } else {
        res.json(result)
      }
      res.end();
      conn.release();
    })
  })
});

router.all('/places', function (req, res) {
  var body = req.body
  var params = [
    body.schoolId
  ]
  return dbUtils.getDBConnection(function (err, conn) {
    conn.query(dbSqls.QUERY_PLACES_SQL, params, function (err, result) {
      if (err) {
        res.json({
          code: -1,
          msg: err
        })
      } else {
        res.json(result)
      }
      res.end();
      conn.release();
    })
  })
});

router.all('/provinces', function (req, res) {
  return dbUtils.getDBConnection(function (err, conn) {
    conn.query(dbSqls.QUERY_PROVINCES_SQL, function (err, result) {
      if (err) {
        res.json({
          code: -1,
          msg: err
        })
      } else {
        res.json(result)
      }
      res.end();
      conn.release();
    })
  })
});

router.post('/categories', function (req, res) {
  var body = req.body
  var params = [body.module]
  return dbUtils.getDBConnection(function (err, conn) {
    conn.query(dbSqls.QUERY_CATEGORY_SQL, params, function (err, result) {
      if (err) {
        res.json({
          code: -1,
          msg: err
        })
      } else {
        res.json(result)
      }
      res.end();
      conn.release();
    })
  })
});

router.all('/config', function (req, res) {
  return dbUtils.getDBConnection(function (err, conn) {
    conn.query(dbSqls.GET_CONFIG_SQL, function (err, result) {
      if (err) {
        res.json({
          code: -1,
          msg: err
        })
      } else {
        if (result.length > 0) {
          res.json(result[0])
        } else {
          res.json({})
        }
      }
      res.end();
      conn.release();
    })
  })
});

router.get('/contact', function (req, res) {
  var params = req.query
  const token = 'zhishanzhimei'
  //token 就是自己填写的令牌
  var key = [token, params.timestamp, params.nonce].sort().join('');
  //将token （自己设置的） 、timestamp（时间戳）、nonce（随机数）三个参数进行字典排序
  var sha1 = crypto.createHash('sha1');
  //将上面三个字符串拼接成一个字符串再进行sha1加密
  sha1.update(key);
  if (sha1.digest('hex') === params.signature) {
    res.send(params.echostr)
  } else {
    res.send(false)
  }
});


router.post('/contact', function (req, res) {
  req.rawBody = '';
  req.on('data', function (chunk) {
    req.rawBody += chunk;
  });
  req.on('end', function () {
    var xmlParser = new xml2js.Parser({explicitArray: false, ignoreAttrs: true})
    xmlParser.parseString(req.rawBody, function (err, result) {
      var data = result.xml
      requestUtils.requestAccessToken(function (err, result) {
        var access_token = result.access_token
        switch (data.MsgType) {
          case 'text': {//用户在客服会话中发送文本消息
            console.log('datadata:', data)
            messageUtils.sendTextMessage("我知道了", data, access_token, function (err, result) {
            });
            break;
          }
          case 'image': { //用户在客服会话中发送图片消息
            messageUtils.sendImageMessage(data.MediaId, data, access_token);
            break;
          }
          case 'event': {
            if (data.Event == 'user_enter_tempsession') {  //用户在小程序“客服会话按钮”进入客服会话,在聊天框进入不会有此事件
              messageUtils.sendTextMessage("您有什么问题吗?", data, access_token, function (err, result) {

              });
            } else if (data.Event == 'kf_create_session') { //网页客服进入回话
              console.log('网页客服进入回话');
            }
            break;
          }
        }
      })
      res.send('success');
    });
  });
});

module.exports = router;