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
    run: () => {
        console.log('main running');
    }
}