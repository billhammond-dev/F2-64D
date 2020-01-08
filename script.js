const inputText = document.querySelector('[data-input]');
const outputText = document.querySelector('[data-output]');
const trash = document.querySelector('[data-trash]');
const copyClip = document.querySelector('[data-copy]');
var undecodedMessage = '';

//event listeners
inputText.addEventListener('click', clearInputText);
inputText.addEventListener('paste', inputMessage);
trash.addEventListener('click', () => {
    clearInputText();
    clearOutputText();
});
copyClip.addEventListener('click', copyToClip);


//functions

function clearInputText() {
    inputText.value = '';
}

function clearOutputText() {
    outputText.value = '';
}

function inputMessage() {
    clearInputText();
    clearOutputText();
    let paste = (event.clipboardData || window.clipboardData).getData('text');
    undecodedMessage = paste;
    decodeMessage(undecodedMessage);
}

function decodeMessage(undecodedMessage) {
    // set output text to whatever our decode fn rets
    outputText.value = b64DecodeUnicode(undecodedMessage);
}

function copyToClip() {
    copyClip.innerHTML="";
    var tempInput = document.createElement("input");
    tempInput.style = "position: absolute; left: -1000px; top: -1000px";
    tempInput.value = outputText.value;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
}

// base64 to UTF8, fn that works on older browsers
function b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''));
}

