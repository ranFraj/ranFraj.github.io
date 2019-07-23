app.current.code = {
    next: () => {
        const component = new Component('upload', './components/upload');
        app.setComponent(component);
        app.run();
    },
    run: () => {
        console.log('main running');
    }
}