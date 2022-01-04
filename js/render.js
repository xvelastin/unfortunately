// Display options //

let hasInit = false;
const audioContainer = document.getElementById("audiocontainer");

window.onload = function () {
    voiceinit(); // sets up audio channels

    //move splash randomly at start
    const splash = document.getElementById("splash");
    const posY = getRandomInt(20, 60);
    const posX = getRandomInt(20, 60);
    splash.style.top = posY + "vh";
    splash.style.left = posX + "vw";
    
    splash.style.display = 'block';
}

function init() {
    if (hasInit) return;
    setTimeout(function () {
        LoadStrings(0);
        hasInit = true;
    }, 1000)
}

function hidecursor() {
    const mainblock = document.getElementById('mainBlock');
    mainblock.style.cursor = 'none';
}

function ChangeOpacity(el_id, time, targetOpacity) {
    let el = document.getElementById(el_id);
    el.style.transition = "opacity " + time + "s";
    el.style.opacity = targetOpacity;
}

function hideanddestroy(el, t) {
    el.style.transition = "opacity " + t + "s";
    el.style.opacity = '0';
    setTimeout(function () {
        el.style.display = 'none';
    }, t * 1000)

}

function hide(el, t) {
    el.style.transition = "opacity " + t + "s";
    el.style.opacity = '0';

}

function unhide(el, t) {
    el.style.transition = "opacity " + t + "s";
    el.style.opacity = '1';

}
