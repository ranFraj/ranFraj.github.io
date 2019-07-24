String.prototype.replaceAll = function(search, replacement) {
    let target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

let app, component;
document.addEventListener('DOMContentLoaded', (event) => {
    app = new App($('#root'));
    component = new Component('splash', './components/splash');
    app.setComponent(component);
    app.run();
});