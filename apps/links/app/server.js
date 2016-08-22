var express = require('express');
var bodyParser = require('body-parser');
var app = express();

//Configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//define routes
app.get('/hello', function(req, res) {
    console.log('hello');
    res.end('hello from API');
})

var server = app.listen(process.env.PORT, function() {
    var port = server.address().port;
    console.log("App now running on port", port);
});
