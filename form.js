const form = document.querySelector("#contactUsForm");

const userName = document.querySelector("#formName");
const userEmail = document.querySelector("#formEmail");
const userMessage = document.querySelector("#formMessage");
const submitButton = document.querySelector("#formSubmitButton");
const formMessageCount = document.querySelector("#formMessageCount");
const formNotificationMsg = document.querySelector("#formNotificationMsg");

let buttonUnlocked = false;

let prevMsg;

const maxMsgCount = 250;
const minMsgCount = 10;
const minNameCount = 2;

let nameCount = 0;

SetDefaultFormInputFieldValue();

/* ------------------- SESSION STORAGE ------------------*/

if(sessionStorage.getItem("isFormSubmitted") == "true"){
    ShowFormSucceffullySubmitted();
    sessionStorage.setItem("isFormSubmitted", false);
    form.scrollIntoView();
}
else {
    formNotificationMsg.textContent = "Message must contain min. " + minMsgCount + " characters.";
    formNotificationMsg.style.color = "rgba(170,170, 170, 1)";
}
//---------------------------------------------------------------//

userMessage.addEventListener("focus", ClearMsgValue);
userEmail.addEventListener("focus", ClearEmailValue);
userName.addEventListener("focus", ClearNameValue);

function ClearInputValue(obj, status) {
    if (status.isCleared == false) {
        obj.value = "";
        status.isCleared = true;
    }
}

let msgStatus = {
    isCleared: false,
}
function ClearMsgValue() {
    ClearInputValue(userMessage, msgStatus);
}

let nameStatus = {
    isCleared: false,
}

function ClearNameValue() {
    ClearInputValue(userName, nameStatus);
}

let emailStatus = {
    isCleared: false,
}
function ClearEmailValue() {
    ClearInputValue(userEmail, emailStatus);
}

form.addEventListener("input", FormUpdated);

function FormUpdated() {

    if(msgStatus.isCleared == false){
        return;
    }

    nameCount = userName.value.length;

    const count = userMessage.value.length;

    //Don't allow input if max char msg count reached...
    if (count > maxMsgCount) {
        userMessage.value = prevMsg;
        return;
    }

    prevMsg = userMessage.value;

    if (count >= minMsgCount && nameCount >= minNameCount) {

        //Only unlock the submit button if the name and email status has been focused...
        if (nameStatus.isCleared == true && emailStatus.isCleared == true) {
            if (buttonUnlocked == false) {
                UnlockSubmitButton();
                buttonUnlocked = true;
            }
        }
    }
    else {
        if (buttonUnlocked == true) {
            LockSubmitButton();
        }

        buttonUnlocked = false;
    }

    formMessageCount.textContent = count + "/" + maxMsgCount;
}

form.addEventListener('submit', OnSubmitForm);

function OnSubmitForm() {
    sessionStorage.setItem("isFormSubmitted", true);

    ShowFormSucceffullySubmitted();

    SetDefaultFormInputFieldValue();
}

function UnlockSubmitButton() {
    submitButton.classList.add("unlocked");
    submitButton.setAttribute("type", "submit");
}

function LockSubmitButton() {
    submitButton.classList.remove("unlocked");
    submitButton.setAttribute("type", "button");
}

submitButton.addEventListener("click", ShowErrorMsg);

function ShowErrorMsg() {
    if (!userEmail.checkValidity()) {
        formNotificationMsg.textContent = "Email format is incorrect.";
        formNotificationMsg.style.color = "rgba(150,0,0,1)";
        return;
    }
    else if (emailStatus.isCleared == false) {
        formNotificationMsg.textContent = "Email address is missing.";
        formNotificationMsg.style.color = "rgba(150,0,0,1)";
        return;
    }
    else if (nameStatus.isCleared == false) {
        formNotificationMsg.textContent = "Name is missing.";
        formNotificationMsg.style.color = "rgba(150,0,0,1)";
        return;
    }
    else if (nameCount < minNameCount) {
        formNotificationMsg.textContent = "Name must contain min. " + minNameCount + " characters.";
        formNotificationMsg.style.color = "rgba(150,0,0,1)";
        return;
    }
    else if (buttonUnlocked == false) {
        formNotificationMsg.textContent = "Message must contain min. " + minMsgCount + " characters.";
        formNotificationMsg.style.color = "rgba(150,0,0,1)";
        return;
    }
}


function ShowFormSucceffullySubmitted(){
    formNotificationMsg.textContent = "Form submitted successfully!";
    formNotificationMsg.style.color = "rgba(197,206 , 78, 1)";
}

function SetDefaultFormInputFieldValue() {
    userName.value = "Enter your name...";
    userEmail.value = "Enter your email address...";
    userMessage.value = "Enter your message here...";
}

