class Component {
    constructor(path) {
        this.path = path;
    }

    loadUI() {
        return new Promise((res, rej) => {
            $.ajax(this.path + (!this.path.endsWith('/') ? '/' : '') + 'index.html')
                .done((data) => {
                    res(data);
                })
                .fail((err) => {
                    rej(err);
                });
        });

    }

    init(cb) {
        this.loadUI()
            .then((ui) => {
                this.html = ui;
                cb(this);
            })
            .catch((err) => {
                console.error(`Error while loading UI: ${err.statusText} (${err.status})`);
            });
    }
}