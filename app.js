'use strict';
var express = require('express');
var timeout = require('connect-timeout');
var router = require('./routes/index');
var userRouter = require('./routes/user');
var noticeRouter = require('./routes/notice');
var examRouter = require('./routes/exam');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
// 设置默认超时时间
app.use(timeout('15s'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', router);
app.use('/user', userRouter);
app.use('/notice', noticeRouter);
app.use('/exam', examRouter);

app.use(function(req, res, next) {
  // 如果任何一个路由都没有返回响应，则抛出一个 404 异常给后续的异常处理器
  if (!res.headersSent) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  }
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.end();
});

module.exports = app;
