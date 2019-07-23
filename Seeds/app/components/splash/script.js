app.current.code = {
    next: () => {
        const component = new Component('main', './components/main');
        app.setComponent(component);
        app.run();
    },
    run: () => {
        console.log('splash running');
    }
}