const backgroundColor = document.getElementById("backgroundColor");

const navBar = document.getElementById("navBar");

const gamePageHeader = document.getElementById("gamePageHeader");

const gamePageInfo = document.getElementById("gamePageInfo");

const footer = document.getElementById("footerContainer");

const height = navBar.offsetHeight+ gamePageHeader.offsetHeight + gamePageInfo.offsetHeight - 100 + footer.offsetHeight; 

//---------------------------------------------------------------//
//                         VIDEO SCREENSHOT 
//---------------------------------------------------------------//

const videoGridContainers = document.querySelectorAll("#videoGridContainerVideo");
const videoScreenshots = document.querySelectorAll("#videoScreenshot");
const videoPlayButtons = document.querySelectorAll("#videoPlayButton");
const videoTitles = document.querySelectorAll("#videoTitle");

for (let i = 0; i < videoGridContainers.length; i++) {
    videoGridContainers[i].addEventListener('mouseenter', HoverEnterVideoScreenshot);
    videoGridContainers[i].addEventListener('mouseleave', HoverExitVideoScreenshot);
    videoGridContainers[i].dataset.index = i;
}

function HoverEnterVideoScreenshot(event) {
    videoScreenshots[event.target.dataset.index].classList.add("hover");
    videoPlayButtons[event.target.dataset.index].classList.add("hover");

    videoTitles[event.target.dataset.index].classList.add("hover");
}

function HoverExitVideoScreenshot(event){
    videoScreenshots[event.target.dataset.index].classList.remove("hover");
    videoPlayButtons[event.target.dataset.index].classList.remove("hover");

    videoTitles[event.target.dataset.index].classList.remove("hover");
}

//---------------------------------------------------------------//