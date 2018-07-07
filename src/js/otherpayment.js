document.querySelector('.sweet-mpesa').onclick = function(){
    swal({
            title: "Enter transaction ID !!",
            text: "Please enter the transaction code received in the message you received from mpesa after payment !!",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: "Mpesa transaction ID"
        },
        function(inputValue){
            if (inputValue === false) return false;
            if (inputValue === "") {
                swal.showInputError("You need key in the ID!");
                return false
            }
            swal("Success !!", "Transaction ID: " + inputValue + " Sent. Please wait for confirmation", "success");
        });
};

document.querySelector('.sweet-cash').onclick = function(){
    swal({
        title: "Confirmed !!",
        text: "The waiter is coming with your order !!",
        imageUrl: "images/hand.jpg"
    });
};