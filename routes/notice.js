/**
 * Created by songang on 2017/10/15.
 */
var express = require('express');
var router = express.Router();
var dbUtils = require('../utils/dbUtils')
var dbSqls = require('../utils/dbSqls')

router.post('/insert', function (req, res) {
  var body = req.body
  var now = new Date()
  return dbUtils.getDBConnection(function (err, conn) {
    var params = [
      body.title,
      body.openId,
      body.categoryId,
      body.content,
      body.images,
      now,
      now
    ]
    conn.query(dbSqls.INSERT_NOTICE_SQL, params, function (err, result) {
      if (err) {
        res.json({
          code: -1,
          msg: err
        })
      } else {
        res.json({
          code: 200
        })
      }
      conn.release();
    })
  })
});

router.post('/list', function (req, res) {
  var body = req.body
  var page = body.page || 0
  var count = body.count || 10
  var skip = page * count
  var params = [skip, count]
  return dbUtils.getDBConnection(function (err, conn) {
    conn.query(dbSqls.QUERY_NOTICES_SQL, params, function (err, result) {
      if (err) {
        res.json({
          code: -1,
          msg: err
        })
      } else {
        res.json(result)
      }
      conn.release();
    })
  })
});

module.exports = router;