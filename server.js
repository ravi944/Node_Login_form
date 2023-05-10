const express = require('express');
var bodyParser = require('body-parser');
const app = express();
var mysql2 = require('mysql2');





var mysql2=require('mysql2');
 var connection=mysql2.createConnection({
   host:'localhost',
   user:'root',
   password:'1234',
   database:'anubd'
 });
connection.connect(function(error){
   if(!!error){
     console.log(error);
   }else{
     console.log('Connected!:)');
   }
 });  
module.exports = connection;

// serve static files from the  directory
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static('public'));

// serve the home page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/register.html');
});

app.post('/reg', (req, res) => {
    const username = req.body.username;
    const regno = req.body.regno;
    const password = req.body.password;
    const confirm_password = req.body.confirm_password;
    const sql = `INSERT INTO anutable (username, regno, password,confirm_password) VALUES ('${username}', '${regno}','${password}','${confirm_password}')`;
  
    connection.query(sql, (err, result) => {
    if (err) throw err;
  
      res.redirect('/login.html');
      // console.log('Redirecting to /regd1.html');
    });
  });




 // index page
app.get('/login.html', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});
app.post('/login', function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  var sql1='SELECT * FROM anutable WHERE username =? AND password =?';
  connection.query(sql1, [username, password], function (err, data, fields) {
      if(err) throw err;
      if(data.length>0){
          console.log('Redirecting to another HTML page');
          res.redirect('/logout.html'); // Redirect to another HTML page
      }else{
          res.send("Your username or password is wrong !");
      }
  });
});





  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });