let app, component;
document.addEventListener('DOMContentLoaded', (event) => {
    app = new App($('#root'));
    component = new Component('../components/splash');
    app.setComponent(component);
    app.run();
});