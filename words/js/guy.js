var letters = [];
var letterIndex = -1;
var box = $('.letter-box');
var randomcheckbox = $('#randomLetter');
var capitalcheckbox = $('#capital');

function showLetter() {
    var l = letters[letterIndex];
    if (capitalcheckbox.prop("checked")) {
        l = l.toUpperCase();
    }
    box.text(l);
}

function setLetters() {
    letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    letterIndex = 0;
    showLetter();
}

function setLevel3() {
    letters = ['the', 'my', 'here', 'is', 'one', 'two', 'are', 'you', 'no', 'go', 'so', 'she', 'he', 'we', 'me', 'be'];
    letterIndex = 0;
    showLetter();
}

function setLevel5() {
    letters = ['to', 'all', 'where', 'what', 'they', 'blue', 'do', 'was', 'black', 'said', 'yellow', 'there', 'three', 'who', 'brown', 'four', 'has', 'green', 'come', 'down'];
    letterIndex = 0;
    showLetter();
}

function next() {
    if (randomcheckbox.prop("checked")) {
        letterIndex = Math.floor(Math.random() * letters.length);
    } else {
        letterIndex++;
        if (letterIndex > letters.length - 1) {
            letterIndex = 0;
        }
    }
    showLetter();
}

function prev() {
    if (randomcheckbox.prop("checked")) {
        letterIndex = Math.floor(Math.random() * letters.length);
    } else {
        letterIndex--;
        if (letterIndex < 0) {
            letterIndex = letters.length - 1;
        }
    }
    showLetter();
}

function play() {
    var isPlaying = box.data("status") === "playing";
    if (!isPlaying) {
        var word = box.text();
        box.data("status", "playing")
        responsiveVoice.speak(word);
        setTimeout(function() {
            box.data("status", "ready");
        }, 500);
    }
}

$(document).ready(setLetters());