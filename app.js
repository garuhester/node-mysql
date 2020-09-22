var bodyParser = require('body-parser');
var ejs = require('ejs');

var express = require('express');
var app = express()

//初始化路由
var route = require('./routes/index');

//ejs
app.set('views', './views/pages'); //设置视图根目录
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

//初始化静态资源
app.use(express.static('./static'));

//初始化body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

route(app);

var mysql = require("mysql")
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test'
})
connection.connect();

connection.query('SELECT * FROM websites', function (err, result) {
    if (err) {
        console.log(err.message);
        return
    }
    console.log(result[0].url);
})

app.listen(8080, function (err) {
    if (err) return err;
    console.log("http://localhost:8080");
});