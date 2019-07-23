class Component {
    constructor(name, path) {
        this.name = name;
        this.path = path + (!path.endsWith('/') ? '/' : '');
    }

    loadCSS() {
        const css = `<link rel="stylesheet" id="css_${this.name}" type="text/css" href="${this.path + 'style.css'}">`;
        $('head').append(css);
    }

    loadUI() {
        return new Promise((res, rej) => {
            $.ajax(this.path + 'index.html')
                .done((data) => {
                    res(data);
                })
                .fail((err) => {
                    rej(err);
                });
        });
    }

    loadScript() {
        return new Promise((res, rej) => {
            $.getScript(this.path + 'script.js')
                .done((script) => {
                    res(script);
                })
                .fail((err) => {
                    rej(err);
                });
        });
    }

    init(cb) {
        this.loadCSS();
        Promise.all([this.loadUI(), this.loadScript()])
            .then((values) => {
                this.html = values[0];
                cb(this);
            })
            .catch((err) => {
                console.error(`Error while loading component: ${err.statusText} (${err.status})`);
            });
    }

    removeCSS() {
        $(`link#css_${this.name}`).remove();
    }
}