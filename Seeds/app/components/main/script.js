app.current.code = {
    upload: (e) => {
        e.preventDefault();
        app.current.code.toggleMenu();
        const component = new Component('upload', './components/upload');
        app.setComponent(component);
        app.run();
    },
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
        const btn = $(button);
        btn.toggleClass('value-true');
        const value = btn.hasClass('value-true');
        db.seeds.find(seed => { return seed.id === btn.data('seed'); })[btn.data('prop')] = value;
        console.log(db.seeds);
    },
    run: () => {
        setTimeout(app.current.code.loadSeeds, 1000);
    }
}