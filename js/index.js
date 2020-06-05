const menuBtn = document.getElementById("menuBtn");
const navigation = document.querySelector(".navigation__inner-container");
const formSubmitBtn = document.getElementById("formSubmitBtn");
const formAdvanced = document.getElementById("formAdvanced");

function mobileMenu() {
    menuBtn.classList.toggle("change");

    if (navigation.style.display === "flex") {
        navigation.style.display = "none";
    } else {
        navigation.style.display = "flex";
    }
}
menuBtn.addEventListener("click", mobileMenu, false);
