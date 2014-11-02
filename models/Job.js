var mongoose = require('mongoose');

var jobSchema = mongoose.Schema({
	title:{type:String},
	description:{type:String}
});

var Job = mongoose.model('Job', jobSchema);

exports.seedJobs = function(callback) {
	Job.find({}).exec(function(error, collection){
		if(collection.length === 0) {
			Job.create({title:'Developer', description:'MEAN.js DevOps with AWS skills'});
			Job.create({title:'Designer', description:'HTML5 CSS3 skills and video/tutorial'});
			Job.create({title:'Customer Support', description:'Chinese customer support by phone and email'});
			Job.create({title:'Financial', description:'Startup Account, GL, Analyst'}, callback);
		}
	})
}