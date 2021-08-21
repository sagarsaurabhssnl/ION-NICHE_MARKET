var isUploaded = false;
function initiateUpload() {
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
    var fileName = document.getElementById("upload-file").files[0].name;
    if (productName.value && productPrice.value && productDetails.value && isUploaded) {
        var location = (firebase.auth().currentUser.uid).toString() + "/" + fileName;
        db.collection("products").add({
            name: productName.value,
            price: productPrice.value,
            details: productDetails.value,
            type: "product",
            location: location
        })
    } else {
        alert("All the fields are mandatory");
    }
}