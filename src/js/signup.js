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

	$("#signup_pass1_error_message").hide();
    $("#signup_email_error_message").hide();
    $("signup_pass2_error_message").hide();

	let error_password = false;
    let error_email = false;
    let error_retype_password = false;

	$("#pass1").focusout(function() {

		check_password();
		
    });
    
    $("#pass2").focusout(function() {

		check_retype_password();
		
	});


	$("#email").focusout(function() {

		check_email();
		
	});


	function check_password() {
	
		var password_length = $("#pass1").val().length;
		
		if(password_length < 8) {
			$("#signup_pass1_error_message").html("Your password must be at least 8 characters long");
			$("#signup_pass1_error_message").show();
			error_password = true;
		} else {
			$("#signup_pass1_error_message").hide();
		}
	
	}

	function check_email() {

		var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
	
		if(pattern.test($("#email").val())) {
			$("#signup_email_error_message").hide();
		} else {
			$("#signup_email_error_message").html("Please enter a valid email address");
			$("#signup_email_error_message").show();
			error_email = true;
		}
	
    }

    function check_retype_password() {
	
		var password = $("#pass1").val();
		var retype_password = $("#pass2").val();
		
		if(password !=  retype_password) {
			$("#signup_pass2_error_message").html("Please enter the same password as above");
            $("#signup_pass2_error_message").show();
            
			error_retype_password = true;
		} else {
			$("#signup_pass2_error_message").hide();
		}
	
	}
    
    let signUpBtn = document.getElementById('sign_up');

    signUpBtn.addEventListener('click',()=>{

        error_password = false;
        error_email = false;
        error_retype_password = false;

        check_password();
        check_email();
        check_retype_password()

        if(error_password == false && error_email == false && error_retype_password == false) {
            let email = document.getElementById('email').value;
			let password = document.getElementById('pass1').value;
			let db = firebase.firestore();
            
            firebase.auth().createUserWithEmailAndPassword(email, password).then(()=>{
				db.collection('users').doc().set({
					email: email,
					name: 'john doe',
					avatar: 'default',
					is_admin: 'no',
					member_since: (+new Date())
				})
				.then(function() {
					document.location.href = 'index.html';
				})
				.catch(function(error) {
					console.error("Error writing document: ", error);
				});
            }).catch(function(error) {
                // error handling
                //var errorCode = error.code;
                var errorMessage = error.message;
                $("#signup_credentials_error_message").html(errorMessage);
			    $("#signup_credentials_error_message").show();
              });

			return true;
		} else {
			return false;	
		}
    });
});