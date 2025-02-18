const e1 = require('express');
var app = e1();

var bodyParser = require("body-parser");
app.use(bodyParser.json());

const dbconnect = require('./dbconnect.js');


/*

{
  "sid": 1,
  "sname": "Joe",
  "semail": "joe@example.com",
  "spass": "abc123"
}
*/

// REG API - Register Student
app.post('/reg', (req, res) => {
  const { sid, sname, semail, spass } = req.body;

  dbconnect.query('INSERT INTO studentdetails (sid, sname, semail, spass) VALUES (?, ?, ?, ?)', 
  [sid, sname, semail, spass], 
  (error, results) => {
      if (error) {
          console.error(error);
          res.status(500).send('Error creating student record');
      } else {
          res.status(200).send('Student record inserted successfully');
      }
  });
});

/*
In Postman, use the following URL for GET request:
localhost:5000/view
*/

// VIEW API
app.get('/view', (req, res) => {
  dbconnect.query('SELECT * FROM studentdetails', (error, results) => {
      if (error) {
          console.error(error);
          res.status(500).send('Error retrieving student records');
      } else {
          res.status(200).json(results);
      }
  });
});

/*
In Postman, use the following URL for GET request:
localhost:5000/search/1
*/

// SEARCH API
app.get('/search/:id', (req, res) => {
  const sid = req.params.id;
  dbconnect.query('SELECT * FROM studentdetails WHERE sid=?', [sid], (error, results) => {
      if (error) {
          console.error(error);
          res.status(500).send('Error retrieving student record');
      } else {
          res.status(200).json(results);
      }
  });
});

/*
In Postman, use the following URL for POST request:
localhost:5000/login

{
  "sid": 1,
  "spass": "abc123"
}
*/

// LOGIN API 
app.post('/login', (req, res) => {
  const { sid, spass } = req.body;

  dbconnect.query('SELECT * FROM studentdetails WHERE sid=? AND spass=?', 
  [sid, spass], 
  (error, results) => {
      if (error) {
          console.error(error);
          res.status(500).send('Error during student login');
      } else {
          if (results.length > 0) {
              res.status(200).send('Login successful');
          } else {
              res.status(401).send('Invalid Student ID or Password');
          }
      }
  });
});


//Update API
app.put('/update/:id', (req, res) => {
    const sid = req.params.id;
    const { sname, spass } = req.body;
  
    dbconnect.query('UPDATE studentdetails SET sname = ?, spass = ? WHERE sid = ?', 
    [sname, spass, sid], 
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error updating student');
      } else {
        res.status(200).send('Student record updated successfully');
      }
    });
  });
  
//Delete API
app.delete('/remove/:id', (req, res) => {
    const sid = req.params.id;
  
    dbconnect.query('delete from studentdetails where sid=?', [sid], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error deleting Student');
    } else {
        res.status(200).send('Student deleted successfully');
    }
    });
  });


// START THE EXPRESS SERVER - 5000 is the PORT NUMBER
app.listen(5000, () => console.log('EXPRESS Server Started at Port No: 5000'));
