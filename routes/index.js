var express = require('express');
var router = express.Router();
var dbUtils = require('../utils/dbUtils')
var dbSqls = require('../utils/dbSqls')

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

router.all('/grades', function (req, res) {
  return dbUtils.getDBConnection(function (err, conn) {
    conn.query(dbSqls.QUERY_GRADES_SQL, function (err, result) {
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

router.all('/seasons', function (req, res) {
  return dbUtils.getDBConnection(function (err, conn) {
    conn.query(dbSqls.QUERY_SEASONS_SQL, function (err, result) {
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



module.exports = router;