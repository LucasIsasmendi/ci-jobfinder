var mongoose = require('mongoose');
var Promise = require('bluebird');

var jobSchema = mongoose.Schema({
	title:{type:String},
	description:{type:String}
});

var jobs = [
		{title:'Developer', description:'MEAN.js DevOps with AWS skills'},
		{title:'Designer', description:'HTML5 CSS3 skills and video/tutorial'},
		{title:'Customer Support', description:'Chinese customer support by phone and email'},
		{title:'Financial', description:'Startup Account, GL, Analyst'}
	];

var Job = mongoose.model('Job', jobSchema);

function findJobs(query){
	return Promise.cast(mongoose.model('Job').find(query).exec());
}

var createJob = Promise.promisify(Job.create, Job);

exports.seedJobs = function() {
	return findJobs({}).then(function(collection){
		if(collection.length === 0) {
			return Promise.map(jobs, function(job){
				return createJob(job);
			});
		}
	});
}