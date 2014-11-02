var express = require('express');
var mongoose = require('mongoose');

var app = express();

app.set('views', __dirname);
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost/jobfinder');

var con = mongoose.connection;
con.once('open', function() {
	console.log("connected to mongodb successfully!")
})

app.listen(process.env.PORT || 3000, process.env.IP);