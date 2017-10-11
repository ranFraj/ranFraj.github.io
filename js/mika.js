var wordpages = {
    red: ['Am', 'At', 'Did', 'Do', 'Get', 'He', 'Like', 'Have', 'Want', 'Be'],
    yellow: ['Brown', 'Came', 'Out', 'Good', 'Are', 'She', 'There', 'Went', 'Who', 'With'],
    purple: ['Four', 'Ate', 'Into', 'Saw', 'Our', 'Will', 'Ran', 'On', 'Must', 'Black'],
    blue: ['All', 'Eat', 'No', 'Now', 'That', 'This', 'Was', 'Well', 'What', 'Yes'],
    green: ['Please', 'Pretty', 'Ride', 'New', 'Say', 'So', 'Soon', 'Too', 'Under', 'White']
}
$(document).ready(function () {
    responsiveVoice.setDefaultVoice("US English Female");
    $(".word").click(function () {
        playWord($(this));
    });
    var isMobile = $(".mobile-menu").is(":visible");
    selectSubMenu('red', $(isMobile ? ".mobile-sub-menu.red" : ".sub-menu.red"));
})

function playWord(button) {
    var word = button.text();
    button.html("<img src='img/play.png' />");
    responsiveVoice.speak(word);
    setTimeout(function () {
        button.html(word);
    }, 500);
}

function selectSubMenu(crayon, button) {
    var $button = $(button);
    var $menu = $(button).parent();
    var isMobile = $button.hasClass("mobile-sub-menu");
    var $menuButton = $menu.prev();
    setupWordsPage(crayon);
    drawWordsPage(crayon);
    if (isMobile) {
        $menuButton.css("background-color", crayon).text(crayon);
        if($menu.hasClass("show")){
            $menuButton.trigger("click");
        }
    } else {
        $(".sub-menu").removeClass("active");
        $button.addClass("active");
    }
}

function drawWordsPage(color) {
    $("#wordspage").css("background-color", color).parent().show();
}

function setupWordsPage(color) {
    var arr = wordpages[color];
    var words = $(".word");
    for (var i in arr) {
        words.eq(i).text(arr[i]);
    }
}