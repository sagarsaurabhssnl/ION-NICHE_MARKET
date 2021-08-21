// const login = document.getElementById("login");
var loginEmail;
var loginPass;
function initiateLogin() {
    loader.style.visibility = "visible";
    loginEmail = document.getElementById("login-email").value;
    loginPass = document.getElementById("login-password").value;
    console.log(loginEmail);
    firebase.auth().signInWithEmailAndPassword(loginEmail, loginPass)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log(user);
            loggedIn();
            change("home");
            loader.style.visibility = "hidden";
            // ...
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
            console.log(firebase.auth().currentUser);
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