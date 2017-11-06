var express = require('express');
var router = express.Router();
var dbUtils = require('../utils/dbUtils')
var dbSqls = require('../utils/dbSqls')
var crypto = require('crypto')

router.get('/', function (req, res) {
  return dbUtils.getDBConnection(function (err, conn) {
    conn.query('SELECT 1 + 1 AS solution', function (err, rows, fileds) {
      console.log('rows:', rows)
      console.log('fileds:', fileds)
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
  var params = [body.collegeId, body.year]
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
  console.log(req.HTTP_RAW_POST_DATA)
  res.send('success')
});

module.exports = router;