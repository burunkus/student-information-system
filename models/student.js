var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//student schema
var studentSchema = new Schema({
	student_number: {
		type: String,
		required: true,
		unique: true
	},
	first_name: String,
	last_name: String,
	middle_name: String,
	gender: String,
	phone_number: String,
	date_of_birth: String,
	year_of_enrollment: String,
	year_of_completion: String,
	course_of_study: String,
	create_date: {
		type: Date,
		default: Date.now
	}

});

//transform our student schema into a model and make the Resource object accessible outside this file.
var Resource = module.exports = mongoose.model('Resource', studentSchema);

//Get all students.
module.exports.getStudents = function(callback){
	Resource.find(callback);
};

//Get a student by student number.
module.exports.getStudentByStudentNumber = function(sid, callback){
	Resource.findOne({"student_number": sid}, callback);
};

//Create a student.
module.exports.addStudent = function(student, callback){
	//check if student number already exist in the database if it does indicate and don't create, else create new student.
	checkStudentNumber = student.student_number;
	Resource.count({"student_number": checkStudentNumber}, function(err, count){
		if(err){
			callback(err, null);
		}
		else {
			if(count > 0) {
				callback(null, 'Student number already exist.');
			}
			else {
				Resource.create(student, callback(null, 'Student created successfully!'));
			}
		}
	});
};

//Update student.
module.exports.updateStudent = function(sid, student, options, callback){
	var query = {student_number: sid};
	var update = {
		first_name: student.first_name,
		last_name: student.last_name,
		middle_name: student.middle_name,
		gender: student.gender,
		phone_number: student.phone_number,
		date_of_birth: student.date_of_birth,
		year_of_enrollment: student.year_of_enrollment,
		year_of_completion: student.year_of_completion,
		course_of_study: student.course_of_study,
	};
	Resource.update(query, update, options, callback);
};

//Delete student.
module.exports.deleteStudent = function(sid, callback){
	var query = {student_number: sid};
	Resource.findOneAndRemove(query, callback);
};