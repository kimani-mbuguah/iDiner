$(function() {

	$("#item-name-error").hide();
    $("#item-price-error").hide();
    $("#item-desc-error").hide();
    $("#item-image-error").hide();
    $("#upload_progress").hide();

	let error_name = false;
    let error_price = false;
    let error_desc = false;
    let error_category = false;
    let error_image = false;

	$("#item-name").focusout(function() {

		check_name();
		
	});

	$("#item-price").focusout(function() {

		//check_price();
		
    });
    
    $("#item-desc").focusout(function() {

		//check_desc();
		
    });
    $("#item-categoty").focusout(function() {

		//check_category();
		
    });
    
    $("#item-image").focusout(function() {

		//check_image();
		
    });
    
    function check_name() {
	
		let name_length = $("#item-name").val().length;
		
		if(name_length < 3) {
			$("#item-name-error").html("The item name must be at least 3 characters long");
			$("#item-name-error").show();
			error_name = true;
		} else {
			$("#item-name-error").hide();
		}
	
    }
    
    let addItemBtn = document.getElementById('addItemBtn');
    addItemBtn.addEventListener('click',()=>{
        error_name = false;
        error_price = false;	
        								
		check_name();
		
		if(error_name == false ) {
            $("#upload_progress").show();
            let db = firebase.firestore();
            let storageRef = firebase.storage().ref('/idiner_images/');
            let item_name = document.getElementById('item-name').value;
            let item_price = document.getElementById('item-price').value;
            let item_description = document.getElementById('item-desc').value;
            let item_category = document.getElementById('item-category').value;
            const file = document.querySelector('#item-image').files[0];
            const name = (+new Date()) + '-' + file.name;
            const metadata = { contentType: file.type };
            // Upload file and metadata to the object 'menu_images/filename.jpg'
            let uploadTask = storageRef.child('menu_images/' + name).put(file, metadata);
            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            function(snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                document.getElementById("upload_progress").innerHTML =`
                    <div class="progress m-t-20">
                        <div class="progress-bar bg-success" style="width: ${progress}%; height:15px;" role="progressbar">
                        </div>
                    </div>
                    <strong>Image upload ${progress}% done.</strong> 
                `;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: 
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: 
                    console.log('Upload is running');
                    break;
                }
            }, function(error) {
                    //error handling
                    switch (error.code) {
                        case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        console.log('User is not authorized to perform the desired action, check your security rules to ensure they are correct.');
                        break;

                        case 'storage/canceled':
                        // User canceled the upload
                        console.log('User canceled the operation.');
                        break;

                        case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        console.log('An unknown error occurred.');
                        break;
                    }
                }, function() {
                        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                            //check if column exists
                            let random_item_id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                            db.collection(item_category).doc().set({
                                item_name: item_name,
                                item_price: item_price,
                                item_description: item_description,
                                item_category: item_category,
                                item_image: downloadURL,
                                item_id: random_item_id
                            })
                            .then(function() {
                                console.log("Document successfully written!");
                            })
                            .catch(function(error) {
                                console.error("Error writing document: ", error);
                            });

                            $("#upload_progress").hide();
                            console.log('File available at', downloadURL);
                            (function(){
                                swal({
                                    title: "Sweet !!",
                                    text: "Item Added Successfully !!",
                                    imageUrl: "images/hand.jpg"
                                });
                            }
                            ()
                            );
                        });
                    });
			return true;
		} else {
			return false;	
		}
    });
});