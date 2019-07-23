let app, component;
document.addEventListener('DOMContentLoaded', (event) => {
    app = new App($('#root'));
    component = new Component('splash', './components/splash');
    app.setComponent(component);
    app.run();
});