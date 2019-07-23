class App {
    components = [];
    constructor(root) {

        this.container = root;
        if (!this.container || this.container.length === 0) {
            throw new Error('App container is missing or invalid');
        }
    }

    setComponent(component) {
        this.components.push(component);
        this.current = component;
    }

    back() {
        const last = () => { return this.components.length - 1 };
        this.current.removeCSS()
        this.components.splice(last(), 1);
        this.current = this.components[last()];
        this.container.html(this.current.html);
    }

    run() {
        this.current.init(() => {
            this.container.attr('data-component', this.current.name);
            this.container.html(this.current.html);
            this.current.code.run();
        })
    }
}