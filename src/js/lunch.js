(function(){
    // Initialize Cloud Firestore through Firebase
    let db = firebase.firestore();
    //populate lunch
    const snacksCol = document.getElementById("populate-lunch");
    db.collection("lunch").onSnapshot(function(querySnapshot) {
    querySnapshot.forEach(function(menu) {
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
                    <button type="button" class="btn btn-primary btn-flat btn-addon m-b-10 m-l-5" onclick="addToCart('lunch','${menu.data().item_id}')"><i class="fa fa-shopping-cart"></i>  Add To Cart</button>
                    </div>
                        <div class="clear"></div>
                </div>
            </div>
        </div>
    </div>
    `
      });
    });
}
()
);