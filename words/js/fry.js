class App {

    constructor() {
        this.lastList = 0;
    }

    getPageWord(listNumber) {
        const pageNumber = Math.ceil(listNumber / 4);
        switch (pageNumber) {
            default:
                case 1:
                return 'First';
            case 2:
                    return 'Second';
            case 3:
                    return 'Third';
            case 4:
                    return 'Fourth';
        }
    }

    prev(amount) {
        let holder = 1;
        this.lastList -= (amount * 2);
        if (this.lastList < 0) {
            this.lastList = Object.keys(words).length - amount;
        }

        const lastListIndex = this.lastList + amount;
        $('.list').remove();
        for (this.lastList; this.lastList < lastListIndex; this.lastList++) {
            $(`.listHolder${holder}`).html(this.createList(this.lastList + 1));
            holder++;
        }
        this.setPageTitle();
    }

    playButton(button) {
        const $button = $(button);
        if ($button.data('status') !== 'playing') {
            $button.removeClass('glyphicon-play');
            const word = $button.data('word');
            responsiveVoice.speak(word);
            setTimeout(() => {
                $button.addClass('glyphicon-play');
            }, 500);
        }
    }

    next(amount) {
        let holder = 1;
        if (this.lastList >= Object.keys(words).length) {
            this.lastList = 0;
        }
        const lastListIndex = this.lastList + amount;
        $('.list').remove();
        for (this.lastList; this.lastList < lastListIndex; this.lastList++) {
            $(`.listHolder${holder}`).html(this.createList(this.lastList + 1));
            holder++;
        }
        this.setPageTitle();
    }

    createList(listNumber) {
        const listName = 'list' + listNumber;
        if (words.hasOwnProperty(listName)) {
            const $list = $('<tbody></tbody>');
            for (let i = 0; i < words[listName].length; i++) {
                $list.append(`<tr><td>${words[listName][i]}<button class="play-button glyphicon glyphicon-play glyphicon-volume-up" data-status="standby" data-word="${words[listName][i]}" onclick="app.playButton(this)"></button></td></tr>`);
            }
            return $(`<table class="list table table-bordered"><thead><tr><th>List ${listNumber}</th></tr></thead><tbody>${$list.html()}</tbody></table>`)
        } else {
            return null;
        }
    }

    setPageTitle() {
        $('h1').text(`Fry Words - The ${this.getPageWord(this.lastList)} Hundred`);
    }

    init() {
        $('button.next-button:visible').trigger('click')
    }
}

const app = new App();

$(document).ready(() => {
    app.init();
});