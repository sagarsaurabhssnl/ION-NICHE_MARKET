const navBtn = document.querySelector(".nav-btn");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");
-navBtn.addEventListener("click", mobileMenu);
navLink.forEach((n) => n.addEventListener("click", closeMenu));

function mobileMenu() {
    navBtn.classList.toggle("active");
    navMenu.classList.toggle("active");
}

function closeMenu() {
    navBtn.classList.remove("active");
    navMenu.classList.remove("active");
}