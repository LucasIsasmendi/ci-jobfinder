var express = require('express');
var jobModel = require('./models/Job');
var jobsData = require('./jobs-data.js');

var app = express();

app.set('views', __dirname);
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

app.get('/api/jobs', function(req, res) {
	jobsData.findJobs().then(function(collection) {
		res.send(collection);
	});
});

app.get('*', function(req, res) {
	res.render('index');
});

//mongoose.connect('mongodb://localhost/jobfinder');
jobsData.connectDB('mongodb://lucasai:2014lucasai@ds049180.mongolab.com:49180/gjobfinder')
.then(function() {
	console.log("connected to mongodb successfully!");
	jobsData.seedJobs();

})

app.listen(process.env.PORT || 3000, process.env.IP);