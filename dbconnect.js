const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '172.31.25.166', // Database-Server IP
  user: 'root',
  password: 'root',      // The password for MySQL
  database: 'studentDB'
});

connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

module.exports = connection;