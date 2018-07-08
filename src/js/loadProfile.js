initApp = ()=> {
    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
            firebase.firestore().enablePersistence()
            .then(function() {
                // Initialize Cloud Firestore through firebase
                let db = firebase.firestore();
                let email = user.email;
                let userProfile = document.getElementById('user-profile');
                db.collection('users').where('email', '==', email).onSnapshot((querySnapshot)=> {
                    querySnapshot.forEach((profile)=> {
                        userProfile.innerHTML = `
                        <header>
                            <div class="avatar">
                                <img src="https://randomuser.me/api/portraits/women/21.jpg" alt="${profile.data().name}" />
                            </div>
                        </header>

                        <h3>${profile.data().name}</h3>
                            <div class="desc">
                            ${email}
                            </div>
                            <div class="contacts">
                                <a href=""><i class="fa fa-plus"></i></a>
                                <a href=""><i class="fa fa-whatsapp"></i></a>
                                <a href=""><i class="fa fa-envelope"></i></a>
                                <div class="clear"></div>
                            </div>
                        </div>
                        `
                        });
                    });
            })
            .catch(function(err) {
                if (err.code == 'failed-precondition') {
                    console.log(err);
                } else if (err.code == 'unimplemented') {
                    console.log(err);
                }
            });
      }else{
          window.location = 'login.html'
      }
    }, (error)=> console.log(error));
  };

  window.addEventListener('load', ()=> initApp());
