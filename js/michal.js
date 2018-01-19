var AppData = function() {
    this.pages = [{
            header: '1',
            color: 'blue',
            words: [
                "I",
                "a",
                "the",
                "to",
                "said",
                "is",
                "was",
                "you",
                "are",
                "have",
                "has",
                "of",
                "do",
                "come",
                "from"
            ]
        },
        {
            header: '2',
            color: '#FFE200',
            words: [
                "and",
                "good",
                "little",
                "were",
                "want",
                "your",
                "our",
                "says",
                "they",
                "because",
                "goes",
                "don't",
                "who",
                "what",
                "where"
            ]
        },
        {
            header: '3',
            color: 'red',
            words: [
                "any",
                "many",
                "funny",
                "live",
                "give",
                "love",
                "could",
                "should",
                "would",
                "does",
                "off",
                "put",
                "pretty",
                "busy",
                "friend"
            ]
        },
        {
            header: '4',
            color: 'green',
            words: [
                "walk",
                "talk",
                "chalk",
                "some",
                "been",
                "gone",
                "heart",
                "people",
                "buy",
                "done",
                "once",
                "there",
                "sure",
                "sugar",
                "their"
            ]
        },
        {
            header: '5',
            color: 'gray',
            words: [
                "heart",
                "thought",
                "whose",
                "again",
                "against",
                "build",
                "though",
                "enough",
                "through"
            ]
        }
    ];
};

var data = new AppData();

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
    $button = $(button);
    var isPlaying = $button.data("status") === "playing";
    if (!isPlaying) {
        var word = $button.text();
        $button.html("<img src='img/play.png' />");
        $button.data("status", "playing")
        responsiveVoice.speak(word);
        setTimeout(function() {
            $button.html(word);
            $button.data("status", "ready");
        }, 500);
    }
}

function initHeader() {
    var source = document.getElementById("pages-template").innerHTML;
    var template = Handlebars.compile(source)(data);
    $(".pages-headers").html(template);
}

function initPage(page) {
    var source = document.getElementById("words-template").innerHTML;
    var template = Handlebars.compile(source)(page);
    $(".work-place").html(template).scrollTop(0);
}

function activate(index) {
    var page = data.pages[index];
    $(".work-place").css("background-color", page.color).show();
    initPage(page);
}

$(document).ready(function() {
    responsiveVoice.setDefaultVoice("US English Female");
    initHeader();
    activate(0);
});