/**
 * Created by songang on 2017/10/17.
 */
var express = require('express');
var router = express.Router();
var requestUtils = require('../utils/requestUtils')

router.post('/', function (req, res) {
  var body = req.body
  var code = body.code
  requestUtils.requestOpenId(code, function (err, result) {
    res.json(result)
  })
});


module.exports = router;