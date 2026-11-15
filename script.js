//On page load...
window.addEventListener("load", InitializeOnPageLoad);

//Scrolls the page to the top...
// history.scrollRestoration = 'manual';

function InitializeOnPageLoad() {
    overlay.classList.add("close")
    yodhaLogo.classList.add("visible")
}

const options = {
    root: null,
    rootMargin: '0px',
    scrollMargin: '0px',
    threshold: 0.25,
};

function canSeeElementCallback(entry) {
    if (entry.isIntersecting) {

        if (entry.target == null) {
            return;
        }

        else if (entry.target == asuraLogo) {
            asuraLogo.classList.add("visible")
            observer.unobserve(asuraLogo);
        }
        else if (entry.target == learnMoreButton) {
            learnMoreButton.classList.add("visible")
            observer.unobserve(learnMoreButton);
        }
    }
}

function callback(entries) {
    entries.forEach(canSeeElementCallback);
}

const observer = new IntersectionObserver(callback, options);

const asuraLogo = document.querySelector('#gameAsuraLogoImg');

const yodhaLogo = document.querySelector('#gameYodhaLogoImg');

const learnMoreButton = document.querySelector('#learnMoreButton');
learnMoreButton.addEventListener("mouseenter", HoverLearnMoreButton);
learnMoreButton.addEventListener("mouseleave", HoverExitLearnMoreButton);

function HoverLearnMoreButton(){
    learnMoreButton.classList.add("hover");
}

function HoverExitLearnMoreButton(){
    learnMoreButton.classList.remove("hover");
}

// const overlay = document.querySelector('#overlay');

const yodhaPoster = document.querySelector('#gameYodhaPoster');


observer.observe(yodhaLogo);
observer.observe(asuraLogo);
observer.observe(learnMoreButton);


//---------------------------------------------------------------//

//---------------------------------------------------------------//
//                          GALLERY
//---------------------------------------------------------------//

const galleryLeftArrow = document.querySelector('#galleryLeftArrow');
const galleryRightArrow = document.querySelector('#galleryRightArrow');

const galleryMainPic = document.querySelector("#galleryMainPic");
const galleryMainPicLink = document.querySelector("#galleryMainPicLink");
const galleryPics = document.querySelectorAll("#gallerySlidePic");

galleryLeftArrow.addEventListener("click", ClickGalleryLeftArrow);
galleryRightArrow.addEventListener("click", ClickGalleryRightArrow);

let selectedPic = 0;

galleryPics[selectedPic].classList.add("selected");
galleryPics[selectedPic].style.opacity = "1.0";

function ClickGalleryLeftArrow() {
    galleryPics[selectedPic].classList.remove("selected");
    galleryPics[selectedPic].style.opacity = "0.75";

    selectedPic--;

    if (selectedPic == -1) selectedPic = 5;

    galleryMainPic.src = galleryPics[selectedPic].src;
    galleryMainPicLink.href = galleryPics[selectedPic].src;

    galleryPics[selectedPic].classList.add("selected");

    galleryPics[selectedPic].style.opacity = "1.0";
}

function ClickGalleryRightArrow() {
    galleryPics[selectedPic].classList.remove("selected");
    galleryPics[selectedPic].style.opacity = "0.75";

    selectedPic++;

    if (selectedPic == 6) selectedPic = 0;

    galleryMainPic.src = galleryPics[selectedPic].src;
    galleryMainPicLink.href = galleryPics[selectedPic].src;

    galleryPics[selectedPic].classList.add("selected");
    galleryPics[selectedPic].style.opacity = "1.0";
}

for(let i = 0; i < galleryPics.length; i++){
    galleryPics[i].dataset.index = i;
    galleryPics[i].addEventListener("click", SelectGallerySlidePic);
    galleryPics[i].addEventListener("mouseenter", HoverEnterGalleryPic);
    galleryPics[i].addEventListener("mouseleave", HoverExitGalleryPic);
}

function SelectGallerySlidePic(event) {
    galleryPics[selectedPic].style.opacity = "0.75";
    galleryPics[selectedPic].classList.remove("selected");

    selectedPic = event.target.dataset.index;
    galleryPics[selectedPic].classList.add("selected");

    galleryMainPic.src = galleryPics[selectedPic].src;
    galleryPics[selectedPic].style.opacity = "1.0";
} 

function HoverEnterGalleryPic(event) {
    i = event.target.dataset.index;

    if(selectedPic == i) return;

    galleryPics[i].style.opacity = "0.85";
}

function HoverExitGalleryPic(event) {
    i = event.target.dataset.index;

    if(selectedPic == i) return;

    galleryPics[i].style.opacity = "0.75";
}


//---------------------------------------------------------------//

/* HOVER ARROW */

const arrowImage = document.querySelectorAll(".arrowImage");

for(let i = 0; i  <arrowImage.length; i++){
    arrowImage[i].addEventListener("mouseenter", HoverArrow)
    arrowImage[i].addEventListener("mouseleave", HoverExitArrow)
}

function HoverArrow(event) {
    event.target.classList.add("hover");
}

function HoverExitArrow(event){
    event.target.classList.remove("hover");
}
