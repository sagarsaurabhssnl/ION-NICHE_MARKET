var signupEmail;
var signupPass;
function initiateSignup() {
    loader.style.visibility = "visible";
    signupEmail = document.getElementById("signup-email").value;
    signupPass = document.getElementById("signup-password").value;
    signupName = document.getElementById("signup-name").value;
    firebase.auth().createUserWithEmailAndPassword(signupEmail, signupPass)
        .then((userCredential) => {
            var user = userCredential.user;
            loggedIn();
            change("home");
            loader.style.visibility = "hidden";
        })
        .catch((error) => {
            var errorMessage = error.message;
            alertM(errorMessage);
            loader.style.visibility = "hidden";
        });
}