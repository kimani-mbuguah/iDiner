function addToCart(item_category,random_item_id){

    let user = firebase.auth().currentUser;
    let db = firebase.firestore();
    let email;

    if (user != null) {
    email = user.email; 
    db.collection(item_category).where('item_id', '==', random_item_id).onSnapshot(function(querySnapshot) {
        querySnapshot.forEach(function(menu) {
            db.collection("cart").doc().set({
                customer_email: email,
                item_name: menu.data().item_name,
                item_price: menu.data().item_price,
                item_image: menu.data().item_image,
                item_id: random_item_id
            })
            .then(function() {
                (function(){
                    swal("Awesome !!", menu.data().item_name + " added to cart !!", "success")
                }());
                console.log("Item added to cart succesfully!");
            })
            .catch(function(error) {
                (function(){
                    sweetAlert("Oops...", "Something went wrong !!", "error");
                }());
                console.error("Error adding item to cart: ", error);
            }) 
          });
      });
    }else{
        (
            function(){
                swal({
                        title: "Action cannot be completed",
                        text: "You must be signed in to perform this operation !!",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Sign me in",
                        cancelButtonText: "I don't want to sign in",
                        closeOnConfirm: false,
                        closeOnCancel: false
                    },
                    function(isConfirm){
                        if (isConfirm) {
                            (function(){
                               window.location.href = 'login.html';
                            }());
                        }
                        else {
                            swal("Sad !!", "You will not be able to order online !!", "error");
                        }
                    });
            }
        ());
    }
}