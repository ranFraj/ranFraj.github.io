class App {
    constructor(root) {
        this.container = root;
        if (!this.container || this.container.length === 0) {
            throw new Error('App container is missing or invalid');
        }
    }

    setComponent(component) {
        this.running = component;
    }

    run() {
        this.running.init(() => {
            this.container.html(this.running.html);
        })
    }
}