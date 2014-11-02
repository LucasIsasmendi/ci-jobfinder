var express = require('express');
var mongoose = require('mongoose');
var jobModel = require('./models/Job')

var app = express();

app.set('views', __dirname);
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

app.get('/api/jobs', function(req, res) {
	mongoose.model('Job').find({}).exec(function(error, collection) {
		res.send(collection);
	});
});

app.get('*', function(req, res) {
	res.render('index');
});

mongoose.connect('mongodb://localhost/jobfinder');

var con = mongoose.connection;
con.once('open', function() {
	console.log("connected to mongodb successfully!");
	jobModel.seedJobs();
})

app.listen(process.env.PORT || 3000, process.env.IP);