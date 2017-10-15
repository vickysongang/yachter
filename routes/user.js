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
      body.nickname,
      body.gender,
      body.avatarUrl,
      body.openId,
      body.schoolId,
      body.collegeId,
      body.majorId,
      body.gradeId,
      body.provinceId,
      body.phone,
      now,
      now
    ]
    conn.query(dbSqls.INSERT_USER_SQL, params, function (err, result) {
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

router.post('/queryById', function (req, res) {
  var body = req.body
  return dbUtils.getDBConnection(function (err, conn) {
    var params = [
      body.openId
    ]
    conn.query(dbSqls.QUERY_USER_SQL, params, function (err, result) {
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

router.post('/queryInfoById', function (req, res) {
  var body = req.body
  return dbUtils.getDBConnection(function (err, conn) {
    var params = [
      body.openId
    ]
    conn.query(dbSqls.QUERY_USERINFO_SQL, params, function (err, result) {
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