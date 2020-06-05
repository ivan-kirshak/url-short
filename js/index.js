const menuBtn = document.getElementById("menuBtn");
const navigation = document.querySelector(".navigation__inner-container");
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

formAdvanced.onsubmit = function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    // console.log(formData);

    const link = formData.get("link");
    addLink(link);

    formAdvanced.reset()
}

function copyLink(event) {
    // console.log(event.target.previousSibling.previousSibling.innerText);

    let linkToCopy = event.target.previousSibling.previousSibling.innerText;
    navigator.clipboard.writeText(linkToCopy);
    event.target.style.backgroundColor = "hsl(257, 27%, 26%)";
    event.target.innerHTML = "Copied!";
}

function addListItem(link) {
    return `<div class="list__inner">
                <h3 class="prev-link">${link}</h3>
                <h3 class="short-link">${link}</h3>
                <button 
                type="button" 
                class="copy-button"
                onclick="copyLink(event)"
                >Copy</button>
            </div>`;
}

function addLink(link) {
    const linksList = document.getElementById("links");

    const linkListItem = document.createElement("li");
    linkListItem.innerHTML = addListItem(link);

    linksList.prepend(linkListItem);
}