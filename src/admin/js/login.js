// Initialize Firebase
let config = {
    apiKey: "AIzaSyCTuRbmCFnzPKJ2wHOjcYkYjwsgJWy8hGA",
    authDomain: "idiner-21936.firebaseapp.com",
    databaseURL: "https://idiner-21936.firebaseio.com",
    projectId: "idiner-21936",
    storageBucket: "idiner-21936.appspot.com",
    messagingSenderId: "914587237954"
};
firebase.initializeApp(config);

$(function() {

	$("#password_error_message").hide();
    $("#email_error_message").hide();
    $("#credentials_error_message").hide();

	var error_password = false;
	var error_email = false;

	$("#password").focusout(function() {

		check_password();
		
	});

	$("#email").focusout(function() {

		check_email();
		
	});


	function check_password() {
	
		var password_length = $("#password").val().length;
		
		if(password_length < 8) {
			$("#password_error_message").html("Your password must be at least 8 characters long");
			$("#password_error_message").show();
			error_password = true;
		} else {
			$("#password_error_message").hide();
		}
	
	}

	function check_email() {

		var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
	
		if(pattern.test($("#email").val())) {
			$("#email_error_message").hide();
		} else {
			$("#email_error_message").html("Please enter a valid email address");
			$("#email_error_message").show();
			error_email = true;
		}
	
    }
    
    let signInBtn = document.getElementById('sign_in');
    signInBtn.addEventListener('click',()=>{

        error_password = false;
		error_email = false;
											
		check_password();
		check_email();
		
		if(error_password == false && error_email == false) {
            let email = document.getElementById('email').value;
            let password = document.getElementById('password').value;

            firebase.auth().signInWithEmailAndPassword(email, password).then(()=>{
                document.location.href = 'index.html';
            }).catch((error)=> {
                // error handling
                let errorCode = error.code;
                let errorMessage = error.message;

                $("#credentials_error_message").html(errorMessage);
			    $("#credentials_error_message").show();
            });

			return true;
		} else {
			return false;	
		}
});
});