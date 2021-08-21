var loginEmail;
var loginPass;
function initiateLogin() {
    loader.style.visibility = "visible";
    loginEmail = document.getElementById("login-email").value;
    loginPass = document.getElementById("login-password").value;
    firebase.auth().signInWithEmailAndPassword(loginEmail, loginPass)
        .then((userCredential) => {
            var user = userCredential.user;
            change("home");
            loader.style.visibility = "hidden";
            loggedIn();
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alertM(errorMessage);
            loader.style.visibility = "hidden";
        });
}
function loggedIn() {
    if (firebase.auth().currentUser) {
        if (firebase.auth().currentUser.emailVerified) {
            loginNode.style.display = "none";
            signupNode.style.display = "none";
            addNode.style.display = "block"
        } else {
            firebase.auth().currentUser.sendEmailVerification()
                .then(() => {
                    alertM("Email verificarion sent to your email")
                });
        }
    } else {
        loginNode.style.display = "block";
        signupNode.style.display = "block";
        addNode.style.display = "none"
    }

}