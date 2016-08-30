var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var r = require('rethinkdbdash')({
  servers: [
    {host: 'localhost', port: 32775}
  ]
});

//Configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});

//define routes
app.get('/links', function(req, res) {  
  r.db('db_links').table('links')
    .run()
    .then(function(result) {
      res.end(JSON.stringify(result));
    })
    .error(function(err) {
      res.status(500).send('Internal Server Error');
    })
});

app.get('/tags', function(req, res) {
  tags = [];
  tags = ['google', 'search', 'whatsapp', 'facebook', 'social', 'chat', 'netflix', 'video'];
  res.end(JSON.stringify(tags));
})

app.post('/link/add', function(req, res){
  var data = req.body;
  console.log(data);
  r.db('db_links').table('links')
    .insert(data)
    .run()
    .then(function(result) {
      res.send('Query executed');
    })
    .error(function(err) {
      res.status(500).send('Internal Server Error');
    })
});

app.post('/link/edit', function(req, res){
  var data = req.body;
  console.log(data);
  r.db('db_links').table('links')
    .filter({"id": data.id})
    .update(data.link)
    .run()
    .then(function(result) {
      res.send('Query executed');
    })
    .error(function(err) {
      res.status(500).send('Internal Server Error');
    })
});

app.post('/link/delete', function(req, res){
  var data = req.body;
  console.log(data);
  r.db('db_links').table('links')
    .filter({"id": data.id})
    .delete()
    .run()
    .then(function(result) {
      res.send('Query executed');
    })
    .error(function(err) {
      res.status(500).send('Internal Server Error');
    })
});

/*
Server start
*/
var server = app.listen(process.env.PORT, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});
