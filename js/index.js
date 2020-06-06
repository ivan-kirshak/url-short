const menuBtn = document.getElementById("menuBtn");
const navigation = document.querySelector(".navigation__inner-container");
const formAdvanced = document.getElementById("formAdvanced");
const urlInput = document.getElementById("urlInput");
const error = document.getElementById("error");

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

    if(link === "") {
        urlInput.style.border = "2px solid hsl(0, 87%, 67%)";
        urlInput.style.color = "red";
        error.innerHTML = "Please add a link";
    } else {
        addLink(link);
        processLink(link);
        urlInput.style.border = "1px solid black";
        urlInput.style.color = "gray";
        error.innerHTML = "";
    }
    

    formAdvanced.reset()
}

function copyLink(event) {
    // console.log(event.target.previousSibling.previousSibling.innerText);

    let linkToCopy = event.target.previousSibling.previousSibling.innerText;
    navigator.clipboard.writeText(linkToCopy);
    event.target.style.backgroundColor = "hsl(257, 27%, 26%)";
    event.target.innerHTML = "Copied!";
}

function processLink(link) {
    console.log("processing");
    let URI = `https://rel.ink/api/links/${link}`;
    const XHR = new XMLHttpRequest();
    if ((XHR.readyState === 4) && (XHR.status === 200)) {
        let result = JSON.parse(XHR.responseText);
        console.log(result);
    }
    XHR.open("POST", URI);
    XHR.send();
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