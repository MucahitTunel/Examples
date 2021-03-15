var express = require('express')
var app = express()

var mysql = require('mysql')
var bodyParser = require('body-parser')

app.use(bodyParser.json({type:'application/json'}))
app.use(bodyParser.urlencoded({extended:true}))

var con = mysql.createConnection({
  host:'localhost',
  user:'mucahit',
  password:'qwer1234',
  database:'nodeDatabase',
})

var server = app.listen(4545, function(){
  var host = server.address().address;
  var port = server.address().port;
})

con.connect(function(error){
  if(error) console.log(error);
  else console.log("connected");
})

app.get('/Kullanici', function(req,res){
  con.query('select * from Kullanici', function(error, rows, fields){
    if(error) console.log(error);
    else {
      console.log(rows);
      res.send(rows)
    }
  })
})

app.post('/Kullanici', function(req,res){
  console.log(req.body.name);
  con.query("Insert into Kullanici(name) values (?)", req.body.name, function(error, result){
    if(error) console.log(error);
    else {
      res.send({"message":"kabul"})
    }
  })
})
