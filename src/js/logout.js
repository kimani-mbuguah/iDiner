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
let logoutBtn = document.getElementById('logout');
logoutBtn.addEventListener('click', ()=>{
        firebase.auth().signOut().then(function() {
        window.location = 'login.html';
        }).catch(()=>console.log("An error occured"));
})