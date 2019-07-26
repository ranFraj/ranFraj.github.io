String.prototype.replaceAll = function(search, replacement) {
    let target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

let app, component;

function go() {
    document.addEventListener('DOMContentLoaded', (event) => {
        app = new App($('#root'));
        component = new Component('splash', './components/splash');
        app.setComponent(component);
        app.run();
    });
}
if (!isMobile.phone) {
    $('.spinner').html('<div class="no-mobile"><h1>Not a mobile device</h1><p>This demo can only run on mobile devices</p></div>');
} else {
    go();
}