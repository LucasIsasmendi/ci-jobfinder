var mongoose = require('mongoose');
var Promise = require('bluebird');

var Job = mongoose.model('Job');

var findJobs = function(query) {
	return Promise.cast(Job.find(query).exec());
}

var createJob = Promise.promisify(Job.create, Job);

//exports 
exports.findJobs = findJobs;

exports.connectDB = Promise.promisify(mongoose.connect, mongoose);

exports.saveJob = createJob;

exports.seedJobs = function() {
	return findJobs({}).then(function(collection){
		if(collection.length === 0) {
			return Promise.map(seedJobs, function(job){
				return createJob(job);
			})
		}
	})
}

var seedJobs = [
		{title:'Developer', description:'MEAN.js DevOps with AWS skills'},
		{title:'Designer', description:'HTML5 CSS3 skills and video/tutorial'},
		{title:'Customer Support', description:'Chinese customer support by phone and email'},
		{title:'Financial', description:'Startup Account, GL, Analyst'}
];
