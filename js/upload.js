var isUploaded = false;
var uploadInitiated = false;
function initiateUpload() {
    uploadInitiated = true;
    var storageRef = firebase.storage().ref();
    var file = document.getElementById("upload-file").files[0];
    console.log(file);
    var thisRef = storageRef.child(firebase.auth().currentUser.uid + "/" + file.name);
    thisRef.put(file).then(function (snapshot) {
        alertM("File Uploaded");
        isUploaded = true;
    });
}

function finishUpload() {
    const productName = document.getElementById("upload-product-name");
    const productPrice = document.getElementById("upload-product-price");
    const productDetails = document.getElementById("multiline-details");
    console.log(productName);
    console.log(productPrice);
    console.log(productDetails);
    var fileName = document.getElementById("upload-file").files[0];
    if (productName.value && productPrice.value && productDetails.value) {
        if (uploadInitiated) {
            if (uploadInitiated && isUploaded) {
                var location = (firebase.auth().currentUser.uid).toString() + "/" + fileName.name;
                db.collection("products").add({
                    name: productName.value,
                    price: productPrice.value,
                    details: productDetails.value,
                    type: "product",
                    location: location
                });
                alertM("Product Published.");
                change("home");
                isUploaded = false;
                uploadInitiated = false;
            } else {
                alertM("Wait for image to upload.");
            }
        } else {
            alertM("Select and add a image.")
        }
    } else {
        alert("All the fields are mandatory.");
    }
}
