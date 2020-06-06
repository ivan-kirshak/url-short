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

    if (link === "") {
        urlInput.style.border = "2px solid hsl(0, 87%, 67%)";
        urlInput.style.color = "red";
        error.innerHTML = "Please add a link";
    } else {
        addLink(link);
        // processLink(link);
        shortenUrl(link);
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

// function processLink(link) {

//     console.log("processing");
//     let URI = `https://rel.ink/api/links/${link}`;
//     const XHR = new XMLHttpRequest();
//     if ((XHR.readyState === 4) && (XHR.status === 200)) {
//         let result = JSON.parse(XHR.responseText);
//         console.log(result);
//     }
//     XHR.open("POST", URI);
//     XHR.send();

// }

let shortLink; 
//  reminded about passed tutorials at codecademy
// https://www.codecademy.com/courses/introduction-to-javascript/lessons/requests-i/exercises/xhr-post-requests-iii
function shortenUrl(link) {

    const apiKey = '0faf89c109e247e8bf91aa06ccbf2412';
    const url = 'https://api.rebrandly.com/v1/links';

    const data = JSON.stringify({ destination: link });
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onreadystatechange = (() => {
        if (xhr.readyState === XMLHttpRequest.DONE) {


            shortLink = xhr.response.shortUrl;
            addListItem(link, shortLink);

            // console.log(xhr.response.shortUrl);
        }
    })
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.setRequestHeader('apikey', apiKey);
    xhr.send(data);
}

function addListItem(link, shortLink) {
    return `<div class="list__inner">
                <h3 class="prev-link">${link}</h3>
                <h3 class="short-link">${shortLink}</h3>
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