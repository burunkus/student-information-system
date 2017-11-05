	function getStudentNumber(id) {
		if(id === 'findStudent' || id === 'searchStudent') {
			const number = document.getElementById(id).value;
			window.location.href='#/student/details/'+number;
		}
	}