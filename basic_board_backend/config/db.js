const mysql = require('mysql');
const fs = require('fs');

const jsonObj = fs.readFileSync('config/aws_mysql_exercise.json', 'utf-8');
const dbInfo = JSON.parse(jsonObj);

let dbcon = {
    init: function () {
        return mysql.createConnection(dbInfo);
    },
    conn: function (con) {
        con.connect(function (err) {
            if (err) {
                console.log("mysql connection error :" + err);
                setTimeout(init, 2000);

            } else {
                console.log("mysql connection sucessfully");
            }
        })
    }
}

module.exports = dbcon; //모듈 등록