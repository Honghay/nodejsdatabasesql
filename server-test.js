const mysql = require("mysql"); // Change to 'pg' if using PostgreSQL
const express = require("express");
const app = express();

app.use(express.json()); // Middleware to parse JSON requests

// Create a database connection
const connection = mysql.createConnection({
    host: '172.31.25.166', // Database-Server IP
    user: 'root',
    password: 'root',      // The password for MySQL
    database: 'studentDB'
  });
// Connect to the database
db.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
        return;
    }
    console.log("Connected to database");
});

// Test query to check database connectivity
db.query("SELECT NOW()", (err, result) => {
    if (err) console.error("Query error:", err);
    else console.log("Database Time:", result);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
