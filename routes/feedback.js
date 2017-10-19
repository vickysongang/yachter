/**
 * Created by songang on 2017/10/19.
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
      body.openId,
      body.content,
      now,
      now
    ]
    conn.query(dbSqls.INSERT_FEEDBACK_SQL, params, function (err, result) {
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


module.exports = router;