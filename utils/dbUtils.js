/**
 * Created by songang on 2017/10/10.
 */
var mysql = require('mysql')
var dbConfig = require('../config/dbConfig')
var pool = mysql.createPool(dbConfig.mysql)


function getDBConnection(cb) {
  pool.getConnection(cb)
}

module.exports = {
  getDBConnection: getDBConnection
}