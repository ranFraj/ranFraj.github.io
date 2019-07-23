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
        let count = this.container.find('.component').length;
        const removeLast = (c) => {
            $(c).remove();
            this.current.removeCSS()
            this.components.splice(count - 1, 1);
            count--;
            this.current = this.components[count - 1];
        }
        setTimeout(() => {
            this.container.find('.component').each((i, c) => {
                const left = parseInt(c.style.left) + 100;
                c.style.left = left + '%';
                if (i === count - 1) {
                    setTimeout(() => {
                        removeLast(c);
                    }, 500);
                }
            });
        }, 100);
    }

    run() {
        this.current.init(() => {
            let count = this.container.find('.component').length;
            this.container.attr('data-component', this.current.name);
            if (count > 0) {
                this.container.append(this.current.html);
            } else {
                this.container.html(this.current.html);
            }
            count++;
            this.current.code.run();
            if (count > 1) {
                setTimeout(() => {
                    this.container.find('.component').each((i, c) => {
                        const left = (count - 1 - i) * 100;
                        c.style.left = (left * -1) + '%';
                    });
                }, 100);
            }
        });
    }
}