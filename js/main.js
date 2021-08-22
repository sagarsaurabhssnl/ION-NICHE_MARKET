var siteState = "home";
var preState = "home";
const alert = document.getElementById("alert-outer");
const showcase = document.getElementById("showcase");
const mainSite = document.getElementById("main-site");
const footer = document.getElementById("footer");
const loginForm = document.getElementById("loginForm-outer-container");
const login = document.getElementById("login");
const signup = document.getElementById("signup");
const addProduct = document.getElementById("addText");
const uploadForm = document.getElementById("upload-outer");
const signupForm = document.getElementById("signupForm-outer-container");
const loginClose = document.getElementById("login-close");
const closeShow = document.getElementById("close");
const alertClose = document.getElementById("alert-close");
const loginNode = document.getElementById("login");
const signupNode = document.getElementById("signup");
const addNode = document.getElementById("addText");
const uploadClose = document.getElementById("upload-close");
const forgot = document.getElementById("forgot-password");
const createAccount = document.getElementById("create-account");
const alreadyAccount = document.getElementById("already-have-account");
createAccount.addEventListener("click", () => {
    change("home");
    setTimeout(() => {
        change("signup");
    }, 100);
});
alreadyAccount.addEventListener("click", () => {
    change("home");
    setTimeout(() => {
        change("login");
    }, 100);
});
forgot.addEventListener("click", () => {
    var resetEmail = document.getElementById("login-email").value;
    if (resetEmail) {
        firebase.auth().sendPasswordResetEmail(resetEmail)
            .then(() => {
                alertM("Password reset link sent to your email.")
            })
            .catch((error) => {
                var errorMessage = error.message;
                alertM(errorMessage);
            });
    }
});
uploadClose.addEventListener("click", () => {
    uploadForm.style.visibility = "hidden";
    change("home");
})
addProduct.addEventListener("click", () => {
    change("upload");
    isUploaded = false;
    uploadInitiated = false;
})
alertClose.addEventListener("click", () => {
    alert.style.visibility = "hidden";
})
closeShow.addEventListener("click", () => { change("home") });
loginClose.addEventListener("click", () => {
    change(preState);
})
const signupClose = document.getElementById("signup-close");
signupClose.addEventListener("click", () => {
    change(preState);
})
login.addEventListener("click", () => {
    change("login");
});
signup.addEventListener("click", () => {
    change("signup");
})
loggedIn();
const uploadClear = document.getElementById("multiline-details");
uploadClear.value = "";

function stopScroll() {
    body.style.overflow = "hidden";
}

function resumeScroll() {
    body.style = "height";
}

// fetch();
window.onload = () => {
    var body = document.getElementById("body");
    body.style = "height";

}

function hideShowcase() {
    showcase.style.display = "none";
}
function showShowcase() {
    showcase.style.display = "block";
}
function hideHome() {
    mainSite.style.display = "none";
}
function showHome() {
    mainSite.style.display = "block";
}
function showLogin() {
    loginForm.style.visibility = "visible"
}
function hideLogin() {
    loginForm.style.visibility = "hidden"
}
function showSignup() {
    signupForm.style.visibility = "visible"
}
function hideSignup() {
    signupForm.style.visibility = "hidden"
}
function showUpload() {
    uploadForm.style.visibility = "visible";
}
function hideUpload() {
    uploadForm.style.visibility = "hidden";
}

function stateChanged() {
    if (siteState === "home") {
        hideUpload();
        hideSignup();
        hideLogin();
        showHome();
        hideShowcase();
        resumeScroll();
    } else if (siteState === "showcase") {
        hideUpload();
        hideSignup();
        hideLogin();
        hideHome();
        resumeScroll();
        showShowcase();
    } else if (siteState === "login") {
        hideUpload();
        hideSignup();
        stopScroll();
        showLogin();
        hideShowcase();
    } else if (siteState === "signup") {
        hideUpload();
        hideLogin();
        showSignup();
        hideShowcase();
        stopScroll();
    } else if (siteState === "upload") {
        showUpload();
        hideLogin();
        hideSignup();
        hideShowcase();
        stopScroll();
    }
}

stateChanged();

function change(toState) {
    preState = siteState;
    siteState = toState;
    stateChanged();
}

function changeImage(uri) {
    var a = document.getElementById("showcase-img");
    a.src = uri;
}

function orderPlaced() {
    alertM("OrderPlaced! Thanks for using this site.")
}

function alertM(message) {
    const alertData = document.getElementById("alert-data");
    alertData.innerHTML = message;
    alert.style.visibility = "visible";
}

async function fetch() {
    var dataProduct = db.collection('products').where('type', '==', 'product');
    dataProduct.get().then((queryData) => {
        queryData.forEach((doc) => {
            async function generateTiles() {
                await storage.child(doc.data().location).getDownloadURL().then(
                    (url) => {
                        var detailProduct = doc.data().details;
                        price = "₹ " + doc.data().price;
                        var anchor = document.createElement("a");
                        anchor.href = "#body";
                        var div1 = document.createElement("button");
                        div1.className = "tiles";
                        div1.customName = url;
                        div1.onclick = () => { change("showcase"); changeImage(url); document.getElementById("showcase-price").innerHTML = "₹ " + doc.data().price; document.getElementById("showcase-description").innerHTML = detailProduct; document.getElementById("showcase-title").innerHTML = doc.data().name };
                        var div2 = document.createElement("div");
                        div2.className = "tiles-container";
                        var over = document.createElement("div");
                        over.className = "over";
                        var overText = document.createElement("div");
                        overText.innerHTML = price;
                        overText.className = "overText";
                        var img = document.createElement("img");
                        img.className = "img";
                        img.src = url;
                        document.getElementById("products").appendChild(anchor).appendChild(div1).appendChild(div2).appendChild(img);
                        div2.appendChild(over).appendChild(overText);
                        return (url);
                    }).catch(function (error) {
                        console.error(error);
                    });
            }
            generateTiles().then(() => {
                var loader = document.getElementById("loader-container");
                loader.style.visibility = "hidden";
            })

        });
    });
}

fetch();

function check() {
    change("login");
}



