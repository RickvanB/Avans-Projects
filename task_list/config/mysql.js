const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'secret',
    database: 'tasks',
    port: 3306,
    multipleStatements: true // this allow you to run multiple queries at once.
});

module.exports = connection;