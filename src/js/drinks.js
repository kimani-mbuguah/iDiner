(function(){
    firebase.firestore().enablePersistence()
  .then(function() {
      // Initialize Cloud Firestore through firebase
      let db = firebase.firestore();
      //populate drinks
      const snacksCol = document.getElementById("populate-drinks");
      db.collection("drinks").onSnapshot(function(querySnapshot) {
      querySnapshot.forEach(function(menu) {
        let source = querySnapshot.metadata.fromCache ? "local cache" : "server";
        if(source === 'local cache'){
            (
                function() {
                    toastr.success("iDiner saved your data. You are working with " + source + " data !!",'Data saved !!',{
                        "positionClass": "toast-bottom-left",
                        timeOut: 5000,
                        "closeButton": true,
                        "debug": false,
                        "newestOnTop": true,
                        "progressBar": true,
                        "preventDuplicates": true,
                        "onclick": null,
                        "showDuration": "500",
                        "hideDuration": "1000",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut",
                        "tapToDismiss": false
                
                    })
                }
            ()
            );
        }
        snacksCol.innerHTML += `
        <div class="col-lg-6">
            <div class="card">
                <div class="card-body">
                    <div class="card-two">
                        <img src="${menu.data().item_image}" class="img-fluid thumbnail m-r-15" alt="iDiner" />
                        <h3>${menu.data().item_name}</h3>
                        <div class="desc">
                            ${menu.data().item_description}
                        </div>
                        <div class="desc">
                            Ksh ${menu.data().item_price}/=
                        </div>
                        <div class="desc">
                        <button type="button" class="btn btn-primary btn-flat btn-addon m-b-10 m-l-5" onclick="addToCart('drinks','${menu.data().item_id}')"><i class="fa fa-shopping-cart"></i>  Add To Cart</button>
                        </div>
                            <div class="clear"></div>
                    </div>
                </div>
            </div>
        </div>
        `
        });
      });
  })
  .catch(function(err) {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
      }
  });
}
()
);