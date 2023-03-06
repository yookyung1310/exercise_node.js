var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysql = require('mysql');  //추가
var fs = require('fs');  //추가
var db = require('./config/db'); //db 연결 모듈 호출
var cors = require('cors'); //교차통신 모듈 호출


var indexRouter = require('./routes/index'); //router 설정파일 호출
var usersRouter = require('./routes/users'); //router 설정파일 호출

var app = express();

// var pwd = fs.readFile(`DB_info`, 'utf8', (err, data) => { console.log(data); return data }); // async
var pwd = fs.readFileSync(`config/DB_info`, 'utf8'); // sync

var conn = db.init();  //db 모듈 커넥션 실행
db.conn(conn); //db 연결 확인

let corsOptions = {
  origin: 'http://localhost',
  credentials: true
}

// // Look into some core variables
// console.log('-----------------')
// console.log(express.json())


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors()); // 교차통신 적용
// app.use(cors(corsOptions)); // 교차통신 적용, 특정 도메인만 접근 권한 부여 (not working as intended)

app.use('/', indexRouter); //앱에 설정한 라우터 모듈을 사용할 수 있게 적용
app.use('/users', usersRouter); //앱에 설정한 라우터 모듈을 사용할 수 있게 적용

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
