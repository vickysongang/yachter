var express = require('express');
var router = express.Router();
var dbUtils = require('../utils/dbUtils')

router.get('/', function (req, res) {
  return dbUtils.getDBConnection(function (err, conn) {
    conn.query('SELECT 1 + 1 AS solution', function (err, rows, fileds) {
      console.log('rows:', rows)
      console.log('fileds:', fileds)
      res.send('Birds home page');
      conn.release()
    })
  })
});

module.exports = router;