var express = require('express');
var jobModel = require('./models/Job');
var jobsData = require('./jobs-data.js');

var app = express();

require('./jobs-service.js')(jobsData,app);

app.set('views', __dirname);
app.set('view engine', 'jade');
//app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res) {
	res.render('index');
	//res.render('index.html');
});

//mongoose.connect('mongodb://localhost/jobfinder');
jobsData.connectDB('mongodb://lucasai:2014lucasai@ds049180.mongolab.com:49180/gjobfinder')
.then(function() {
	console.log("connected to mongodb successfully!");
	jobsData.seedJobs();

})

app.listen(process.env.PORT || 3000, process.env.IP);