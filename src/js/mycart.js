(function(){
    initApp = function() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        const load_cart = document.getElementById("my-idiner-cart");
        let email = user.email;
        let db = firebase.firestore();
        console.log(email);
        db.collection("cart").where('customer_email', '==', email).onSnapshot(function(querySnapshot) {
        querySnapshot.forEach(function(menu) {
          console.log(menu.data().item_name);
            load_cart.innerHTML += `
            <tr>
                <td><img src="${menu.data().item_image}" alt="item image" width = "120px" height = "80px"></td>
                <td>${menu.data().item_name}</td>
                <td>${menu.data().item_price}</td>
                <td>1</td>
                <td><button type="button" class="center btn btn-success btn-flat btn-addon btn-xs m-b-10 m-l-5"><i class="ti-plus"></i></button></td>
                <td><button type="button" class="center btn btn-danger btn-flat btn-addon btn-xs m-b-10 m-l-5"><i class="ti-minus"></i></button></td>
            </tr>
            `
        });
    });
       
      } else {
        // User is signed out.
        window.location = 'login.html';
      }
    }, function(error) {
      console.log(error);
    });
  };

  window.addEventListener('load', function() {
    initApp()
  });
    }());