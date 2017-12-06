var _words = [
    "I", "a", "the",
    "to", "said", "is",
    "was", "you", "are",
    "have", "has", "of",
    "do", "come", "from",
    "and", "good", "little",
    "were", "want", "your",
    "our", "says", "they",
    "because", "goes", "don't",
    "who", "what", "where",
    "any", "many", "funny",
    "live", "give", "love",
    "could", "should", "would",
    "does", "off", "put",
    "pretty", "busy", "friend",
    "walk", "talk", "chalk",
    "some", "been", "gone",
    "heart", "people", "buy",
    "done", "once", "there",
    "sure", "sugar", "their",
    "heart", "thought", "whose",
    "again", "against", "build",
    "though", "enough", "through"
]

function fillWords() {
    var container = $(".container-fluid");
    for (var i = 3; i <= _words.length; i += 3) {
        container.append('<div class="row"><div class="col-4 word">' + _words[i - 3] + '</div><div class="col-4 word">' + _words[i - 2] + '</div><div class="col-4 word">' + _words[i - 1] + '</div></div>');
    }
    container.find(".word").click(function() {
        playWord($(this));
    });
}

function playWord(button) {
    var isPlaying = button.data("status") === "playing";
    if (!isPlaying) {
        var word = button.text();
        button.html("<img src='img/play.png' />");
        button.data("status", "playing")
        responsiveVoice.speak(word);
        setTimeout(function() {
            button.html(word);
            button.data("status", "ready");
        }, 500);
    }
}

$(document).ready(function() {
    responsiveVoice.setDefaultVoice("US English Female");
    fillWords();
});