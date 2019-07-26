app.current.code = {
    loadComponent: (componentName) => {
        const component = new Component(componentName, `./components/${componentName}`);
        app.setComponent(component);
        app.run();
    },
    upload: (e) => {
        e.preventDefault();
        app.current.code.toggleMenu();
        app.current.code.loadComponent('upload');
    },
    about: (e) => {
        e.preventDefault();
        app.current.code.toggleMenu();
        app.current.code.loadComponent('about');
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
    toggleSearch: () => {
        const button = $('.header-icon.search i');
        const search = $('.search-panel');
        if (search.is(':visible')) {
            search.hide();
        } else {
            search.show();
            search.find('input').focus();
        }
        button.toggleClass('fa-times');
    },
    parseTags: (tags) => {
        let html = '';
        for (let tag of tags) {
            html += `<a class="tag" href="${tag}">${tag}</a>`
        }
        return html;
    },
    loadSeeds: () => {
        const content = $('.content');
        const template = $('#seed_template');
        for (let seed of db.seeds) {
            const seedBox = template.clone();
            let html = seedBox.html();
            for (let key in seed) {
                let data = seed[key];
                if (seed.hasOwnProperty(key)) {
                    if (key === 'tags' && Array.isArray(data) && data.length > 0) { //tags
                        data = app.current.code.parseTags(data);
                    }
                    html = html.replaceAll(`{${key}}`, data);
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