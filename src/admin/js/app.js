initApp = function() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        let displayName = user.displayName;
        let email = user.email;
        let emailVerified = user.emailVerified;
        let photoURL = user.photoURL;
        let uid = user.uid;
        let phoneNumber = user.phoneNumber;
        let providerData = user.providerData;

        //document.getElementById("display_name").innerHTML =`<a href='#'><i class='ti-user'></i>  ${displayName}</a>`;
        //document.getElementById("display_email").innerHTML =`<a href='#'><i class='ti-email'></i>  ${email}</a>`;
      }else{
        window.location = '../index.html';
      }
    }, function(error) {
      console.log(error);
    });
  };

  window.addEventListener('load', function() {
    initApp()
  });