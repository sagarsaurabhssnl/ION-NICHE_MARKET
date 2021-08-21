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
uploadClose.addEventListener("click", () => {
    uploadForm.style.visibility = "hidden";
    change("home");
})
addProduct.addEventListener("click", () => {
    change("upload");
    isUploaded = false;
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
    var loader = document.getElementById("loader-container");
    loader.style.visibility = "hidden";
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
    if (!gif) {
        const placeOrderContainer = document.getElementById("orderPlaced-container");
        placeOrderContainer.style.visibility = "visible";
        var gif = document.createElement("img");
        gif.src = "./assets/images/orderPlaced.gif";
        gif.id = "order-placed";
        console.log(gif);
        document.getElementById("orderPlaced").appendChild(gif);
        console.log()
        setTimeout(() => {
            const remove = document.getElementById("order-placed");
            remove.remove();
            placeOrderContainer.style.visibility = "hidden";
            change("home");
        }, 6000);
    }
}

function alertM(message) {
    const alertData = document.getElementById("alert-data");
    alertData.innerHTML = message;
    alert.style.visibility = "visible";
}

// function uploadFile() {

// }

// for (let i = 0; i < 50; i++) {
//     async function loadImage() {
//         let count = Math.round(Math.random() * 10) + 1;

//     }
//     loadImage().then(() => {
//         // const tile = document.getElementsByClassName("tiles");
//         // console.log("called1");
//         // console.log(tile.length);
//         // for (let i = 0; i < tile.length; i++) {
//         //     console.log("called");
//         //     tile[i].addEventListener("click", () => { console.log(tile[i].customName); });
//         // }
//         // console.log(tile);
//     });
//     // localStorage.setItem("sagar1216Data", "Hello World");
// }

async function fetch() {
    var dataProduct = db.collection('products').where('type', '==', 'product');
    dataProduct.get().then((queryData) => {
        queryData.forEach((doc) => {
            console.log(doc.data());
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
                        div1.onclick = () => { localStorage.setItem(url, "sagar1216iocshow"); console.log(url); change("showcase"); changeImage(url); document.getElementById("showcase-price").innerHTML = price; document.getElementById("showcase-description").innerHTML = detailProduct; document.getElementById("showcase-title").innerHTML = doc.data().name };
                        // div1[i].addEventListener("click", () => { localStorage.setItem(div1.customName, "sagar1216iocshow"); alert(localStorage.getItem("sagar1216iocshow")); });
                        var div2 = document.createElement("div");
                        div2.className = "tiles-container";
                        // var overContainer = document.createElement("div");
                        // over.className = "over";
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
            generateTiles();

        });
    });
}

fetch();

function check() {
    change("login");
}



