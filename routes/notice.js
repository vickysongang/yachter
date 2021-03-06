/**
 * Created by songang on 2017/10/15.
 */
var express = require('express');
var router = express.Router();
var dbUtils = require('../utils/dbUtils')
var htmlUtils = require('../utils/htmlUtils')
var dbSqls = require('../utils/dbSqls')

router.post('/insert', function (req, res) {
  var body = req.body
  var now = new Date()
  var content = body.content
  var abstract = htmlUtils.delHtmlTag(content)
  if (abstract.length > 100) {
    abstract = abstract.substring(0, 100) + '...'
  }
  var params = [
    body.title,
    body.openId,
    body.categoryName,
    content,
    abstract,
    body.type,
    body.images,
    body.approveFlag,
    0,
    now,
    now
  ]
  return dbUtils.getDBConnection(function (err, conn) {
    conn.query(dbSqls.INSERT_NOTICE_SQL, params, function (err, result) {
      if (err) {
        res.json({
          code: -1,
          msg: err
        })
        conn.release();
      } else {
        var noticeId = result.insertId
        var relParams = [
          body.schoolId,
          body.majorId,
          body.collegeId,
          body.placeId,
          body.year,
          noticeId
        ]
        conn.query(dbSqls.INSERT_NOTICE_REL_SQL, relParams, function (err, result) {
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
      }
    })
  })
});

router.post('/list', function (req, res) {
  var body = req.body
  var page = parseInt(body.page || 0)
  var count = parseInt(body.count || 10)
  var skip = page * count
  var params = []
  var sql
  if (body.type === 'class') {
    sql = dbSqls.QUERY_CLASS_NOTICES_SQL
    params = [body.type, body.schoolId, body.collegeId, body.majorId, body.placeId, body.year, 'Y', skip, count]
  } else {
    sql = dbSqls.QUERY_COLLEGE_NOTICES_SQL
    params = [body.type, body.schoolId, body.collegeId, body.placeId, 'Y', skip, count]
  }
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
    conn.query(dbSqls.GET_NOTICE_DETAIL_SQL, params, function (err, result) {
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
    conn.query(dbSqls.DELETE_NOTICE_SQL, params, function (err, result) {
      if (err) {
        res.json({
          code: -1,
          msg: err
        })
      } else {
        conn.query(dbSqls.DELETE_NOTICE_RELATION_SQL, params, function (err1, result1) {
          res.json(result1)
        })
      }
      conn.release();
    })
  })
});

router.post('/readcount/incr', function (req, res) {
  var body = req.body
  var params = [body.id]
  return dbUtils.getDBConnection(function (err, conn) {
    conn.query(dbSqls.INCR_NOTICE_READCOUNT_SQL, params, function (err, result) {
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