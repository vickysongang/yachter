/**
 * Created by songang on 2017/10/15.
 */
var express = require('express');
var router = express.Router();
var dbUtils = require('../utils/dbUtils')
var dbSqls = require('../utils/dbSqls')

router.post('/list', function (req, res) {
  var body = req.body
  var sql = dbSqls.QUERY_BANNERS
  var params = [body.schoolId]
  // if (body.type === 'class') {
  //   sql = dbSqls.QUERY_BANNERS_BY_MAJOR_SQL
  //   params = [body.module, body.type, body.schoolId, body.collegeId, body.majorId]
  // } else {
  //   sql = dbSqls.QUERY_BANNERS_BY_COLLEGE_SQL
  //   params = [body.module, body.type, body.schoolId, body.collegeId]
  // }
  return dbUtils.getDBConnection(function (err, conn) {
    conn.query(sql, params, function (err, result) {
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

router.post('/detail', function (req, res) {
  var body = req.body
  var params = [body.id]
  return dbUtils.getDBConnection(function (err, conn) {
    conn.query(dbSqls.GET_BANNER_DETAIL_SQL, params, function (err, result) {
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

router.post('/delete', function (req, res) {
  var body = req.body
  var params = [body.id]
  return dbUtils.getDBConnection(function (err, conn) {
    conn.query(dbSqls.DELETE_BANNER_SQL, params, function (err, result) {
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