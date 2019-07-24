app.current.code = {
    /*next: () => {
        const component = new Component('upload', './components/upload');
        app.setComponent(component);
        app.run();
    },*/
    menuBackClick: (e) => {
        $('.menu-back').hide();
    },
    menuClick: (e) => {
        e.stopPropagation();
    },
    toggleMenu: () => {
        const menu = $('.menu-back');
        if (menu.is(':visible')) {
            menu.hide();
        } else {
            menu.show();
        }
    },
    loadSeeds: () => {
        const content = $('.content');
        const template = $('#seed_template');
        for (let seed of db.seeds) {
            const seedBox = template.clone();
            let html = seedBox.html();
            for (let key in seed) {
                if (seed.hasOwnProperty(key)) {
                    html = html.replaceAll(`{${key}}`, seed[key]);
                }
            }
            content.append(html);
        }
    },
    toggleChecked: (button) => {
        $(button).toggleClass('value-true');

    },
    run: () => {
        setTimeout(app.current.code.loadSeeds, 1000);
    }
}