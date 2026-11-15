let hasConsentFormLoaded = false;

window.addEventListener("load", InitializeOnPageLoad);


const overlay = document.querySelector('#overlay');

function InitializeOnPageLoad() {

    if (hasConsentFormLoaded == true) {
        overlay.classList.add("close")
    }
}

//---------------------------------------------------------------//
//                        SHOW UNDERLINE 
//---------------------------------------------------------------//

const navBarText = document.querySelectorAll(".navBarText");

for (let i = 0; i < navBarText.length; i++) {
    navBarText[i].index = i;
    navBarText[i].addEventListener("mouseenter", ShowNavButtonUnderline);
    navBarText[i].addEventListener("mouseleave", HideNavButtonUnderline);
}

const buttonUnderline = document.querySelectorAll(".navBarButtonUnderline");

function ShowNavButtonUnderline(event) {
    console.log("id is", event.target.index);
    const underline = event.target.querySelector(".navBarButtonUnderline");
    buttonUnderline[event.target.index].style.transform = 'scale(1.0, 1.0)';
}

function HideNavButtonUnderline(event) {
    buttonUnderline[event.target.index].style.transform = 'scale(0.0, 0.0)';
}

//---------------------------------------------------------------//
//                         ABOUT US NAV DROP DOWN
//---------------------------------------------------------------//

const aboutUsNavButton = document.querySelector("#aboutUsNavButton");

aboutUsNavButton.addEventListener("mouseenter", ShowAboutUsDropDown);
aboutUsNavButton.addEventListener("mouseleave", HideAboutUsDropDown);

const aboutUsNavDropDown = document.querySelector("#aboutUsNavDropDown");

function ShowAboutUsDropDown() {
    aboutUsNavDropDown.classList.add("active");
}

function HideAboutUsDropDown() {
    aboutUsNavDropDown.classList.remove("active");
}

//---------------------------------------------------------------//
//                         OUR GAME NAV DROP DOWN
//---------------------------------------------------------------//

const gameNavButton = document.querySelector("#ourGamesNavButton");

gameNavButton.addEventListener("mouseenter", ShowGameNavDropDown);
gameNavButton.addEventListener("mouseleave", HideGameNavDropDown);

const gameNavDropDown = document.querySelector("#gameNavDropDown");

function ShowGameNavDropDown() {
    gameNavDropDown.classList.add("active");
}

function HideGameNavDropDown() {
    gameNavDropDown.classList.remove("active");
}

const gameNavDropDownTextContainer = document.querySelectorAll("#gameNavDropDownTextContainer");

for (let i = 0; i < gameNavDropDownTextContainer.length; i++) {
    gameNavDropDownTextContainer[i].addEventListener("mouseenter", HoverEnterGameNavDropDownText)
    gameNavDropDownTextContainer[i].addEventListener("mouseleave", HoverExitGameNavDropDownText)
}

function HoverEnterGameNavDropDownText(event) {
    event.target.classList.add("hover");
}

function HoverExitGameNavDropDownText(event) {
    event.target.classList.remove("hover");
}

//---------------------------------------------------------------//
//                        MOBILE NAV BAR DROP DOWN               // 
//---------------------------------------------------------------//

let burgerMenuEnable = false;

const burgerIcon = document.querySelector("#burgerIcon");
const burgerMenu = document.querySelector("#burgerMenu");

const burgerMenuClipRect = document.querySelector("#burgerMenuClipRect");


burgerIcon.addEventListener('click', ToggleBurgerMenu);


function ToggleBurgerMenu() {
    if (burgerMenuEnable == false) {
        burgerMenu.style.display = "visible";
        burgerMenuClipRect.classList.add("hover");

        burgerMenuEnable = true;
    }
    else {
        burgerMenuClipRect.classList.remove("hover");
        burgerMenu.style.display = "hidden";
        burgerMenuEnable = false;
    }
}

//---------------------------------------------------------------//
//                        BURGER MENU TEXT                       // 
//---------------------------------------------------------------//

// if menu button is clicked in mobile, go to the section and disable the mobile menu...
const burgerMenuTexts = document.querySelectorAll("#burgerMenuText");

for (let i = 0; i < burgerMenuTexts.length; i++) {
    burgerMenuTexts[i].addEventListener('click', DisableMobileMenu);
}

function DisableMobileMenu(){
        burgerMenuClipRect.classList.remove("hover");
        burgerMenuEnable = false;
}

//---------------------------------------------------------------//
//                        HOVERABLE PICTURE                      // 
//---------------------------------------------------------------//

const hoverablePictures = document.querySelectorAll(".hoverablePicture");

for(let i = 0; i < hoverablePictures.length; i++){
    hoverablePictures[i].addEventListener("mouseenter", HoverPicture);
    hoverablePictures[i].addEventListener("mouseleave", UnhoverPicture);
}

function HoverPicture(event){
    event.target.classList.add("hover");
}

function UnhoverPicture(event){
    event.target.classList.remove("hover");
}

//---------------------------------------------------------------//
//                        FOOTER SOCIAL MEDIA ICON HOVER         // 
//---------------------------------------------------------------//


const socialIcon = document.querySelectorAll(".socialIcon");

for(let i = 0; i < socialIcon.length; i++){
    socialIcon[i].addEventListener("mouseenter", HoverSocialIcon);
    socialIcon[i].addEventListener("mouseleave", ExitSocialIcon);
}

function HoverSocialIcon(event){
    event.target.classList.add("hover");
}

function ExitSocialIcon(event){
    event.target.classList.remove("hover");
}

//---------------------------------------------------------------//
//                        COOKIE CONSENT FORM                    // 
//---------------------------------------------------------------//

const footerCookieSettings = document.querySelectorAll('#footerCookieSettings');

for (let i = 0; i < footerCookieSettings.length; i++) {
    footerCookieSettings[i].addEventListener('click', EnableCookieConsentForm);
}

function EnableCookieConsentForm() {
    consentForm.style.display = "block";
    InitializeCookieConsetFormButtons();
}

let analyticsAccess = 'denied';
let isAnalyticsEnabledOnLoad = false;

const savedUserConsent = localStorage.getItem('savedUserConsent');
const consentForm = document.querySelector("#consentFormContainer");

if (window.dataLayer == null) {
    window.dataLayer = [];
}

function gtag() {
    window.dataLayer.push(arguments);
}

function AddGoogleAnalyticsScriptAndDisableConsentForm() {

    const consentSetting = {};

    consentSetting.analytics_storage = 'granted';
    consentSetting.wait_for_update = 500;

    gtag('consent', 'default', consentSetting);
    gtag('js', new Date());
    gtag('config', 'G-R2VD73WYZB')

    const analyticScript = document.createElement("script");
    analyticScript.id = "ga-script";
    analyticScript.async = true;
    analyticScript.src = "https://www.googletagmanager.com/gtag/js?id=G-R2VD73WYZB";

    document.head.appendChild(analyticScript);
}

if (savedUserConsent == 'granted') {
    analyticsAccess = 'granted';
    consentForm.style.display = "none";
    isAnalyticsEnabledOnLoad = true;

    if (isAnalyticsEnabledOnLoad) {
        AddGoogleAnalyticsScriptAndDisableConsentForm();
    }

    hasConsentFormLoaded = true;
    InitializeOnPageLoad();
}
else if (savedUserConsent == 'denied') {
    hasConsentFormLoaded = true;
    InitializeOnPageLoad();
}
else {
    InitializeCookieConsetFormButtons();

    hasConsentFormLoaded = true;
    InitializeOnPageLoad();

    consentForm.style.display = "block";
}

function InitializeCookieConsetFormButtons(){
    const cookieDenyButton = document.querySelector("#consentFormDenyButton");
    cookieDenyButton.addEventListener('click', CookieDenyButtonClicked);

    const cookieAcceptButton = document.querySelector("#consentFormAcceptButton");
    cookieAcceptButton.addEventListener('click', CookieAcceptButtonClicked);
}

function CookieDenyButtonClicked() {
    if (localStorage.getItem('savedUserConsent') == 'granted') {
        console.log(document.cookie);

        const consentSetting = {};
        consentSetting.analytics_storage = 'denied';
        consentSetting.wait_for_update = 500;

        gtag('consent', 'default', consentSetting);

        //remove the cookie here...
        document.cookie = "_ga=; expires=Fri, 01 Jan 1970 00:00:00 GMT; path=/; domain=.ogrehead.com;";
        document.cookie = "_ga_R2VD73WYZB=; expires=Fri, 01 Jan 1970 00:00:00 GMT; path=/; domain=.ogrehead.com;";

    }

    localStorage.setItem('savedUserConsent', 'denied');
    consentForm.style.display = "none";
}
function CookieAcceptButtonClicked() {

    let willReload = false;

    if (localStorage.getItem('savedUserConsent') == 'denied') {
        console.log(document.cookie);
        willReload = true;
    }

    localStorage.setItem('savedUserConsent', 'granted');
    AddGoogleAnalyticsScriptAndDisableConsentForm();
    consentForm.style.display = "none";

    // If the user changed the cookie preference from denied to granted, reload the page for the changes to 
    // take effect.

    if(willReload){
        window.location.reload();
    }
}

//---------------------------------------------------------------//