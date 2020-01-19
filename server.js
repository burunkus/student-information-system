//Get our dependencies into this file
var express = require('express');                              
var app = express();										   
var jwt = require('express-jwt');                             
var jwks = require('jwks-rsa');								   
var jwtAuthz = require('express-jwt-authz');    			   
var bodyParser = require('body-parser');                       
var mongoose = require('mongoose');                            

app.use(express.static(__dirname+'/student-InfoSys-website'));

//enable the use of request body parsing middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

//require our student.js file
Resource = require('./models/student');

//connect to mongoose
mongoose.connect(process.env.MONGOLAB_URI || '...');
var db = mongoose.connection;

//notify when connected successfully or when an error has occured.
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
	console.log('connection to database was successful');
});
/*
//middleware function to validate the access token when any of our API endpoints is called
var jwtCheck = jwt({
	secret: jwks.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: "https://authourizing-client.auth0.com/.well-known/jwks.json"
	}),

	//validate the audience and the issuer.
	audience: 'https://api-schoolinformationsystem.com',
	issuer: "https://authourizing-client.auth0.com/",
	algorithms: ['RS256']
});
*/
//Read students API endpoint
app.get('/students', /*jwtCheck, jwtAuthz(['read:students']),*/ function(req, res){
	Resource.getStudents(function(err, students){
		if(err){
			return res.json(err);
		}
		if(students){
			res.json(students);
		} else {
			res.json({message: 'No records found!.'});
		}
	});
});

//Read a student endpoint
app.get('/student/:sid',/* jwtCheck, jwtAuthz(['read:student']),*/ function(req, res) {
	Resource.getStudentByStudentNumber(req.params.sid, function(err, student){
		if(err){
			return res.json(err);	
		}
		if(student){
			res.json({data: student});
		} else {
			res.json({message: 'Student does not exist!'});
		}
	});
});

//Create a student endpoint
app.post('/student/create',/* jwtCheck, jwtAuthz(['create:student']),*/ function(req, res) {
	//use body-parser to access everything that comes in through the HTML form 
	var student = req.body;
	Resource.addStudent(student, function(err, student){
		if(err){
			return res.json(err);
		}
		res.json(student);
	});
});

//Update student API endpoint
app.put('/student/update/:sid', /*jwtCheck, jwtAuthz(['update:student']),*/ function(req, res) {
	var id = req.params.sid; 
	var student = req.body;
	Resource.updateStudent(id, student, {}, function(err, student){
		if(err){
			return res.json(err);
		}
		if(student) {
			res.json({message: 'Student updated successfully!'});
		}
	});
});

//Delete student API endpoint
app.delete('/student/delete/:sid', /*jwtCheck, jwtAuthz(['delete:student']),*/ function(req, res){
	var id = req.params.sid;
	Resource.deleteStudent(id, function(err, student){
		if(err){
			return res.json(err);
		}
		if(student) {
			res.json({message: 'Student deleted successfully!'});
		}
	});
});

//Authorization error handling middleware.
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({message:'Missing or invalid token'});
  }
});

var port = process.env.PORT || 9090;
//Create server and have it listen to port 9090
app.listen(port, function() {
	console.log("Server has started on port:"+port);
});
