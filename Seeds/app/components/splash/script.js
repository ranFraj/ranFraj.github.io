app.current.code = {
    AppSplash: function(autoHide) {
        const $screen = $('.splash-screen');
        const $holder = $screen.find('.splash-holder');
        const hide = autoHide;
        const me = this;
        const readyEvent = new Event('ready');
        const dismissedEvent = new Event('dismissed');

        this.events = { ready: 'ready', dismissed: 'dismissed' };

        $holder.on('webkitAnimationEnd animationend', function(e) {
            if (e.originalEvent.animationName === 'animate-circle') {
                window.dispatchEvent(readyEvent);
            }
            if (e.originalEvent.animationName === 'move-out') {
                if (!me.isHidden()) {
                    $screen.addClass('hidden');
                    $holder.attr('class', 'splash-holder');
                    window.dispatchEvent(dismissedEvent);
                }
            }
        });

        this.isHidden = () => {
            return $screen.hasClass('hidden');
        }

        this.show = () => {
            if (this.isHidden()) {
                $screen.removeClass('hidden');
                if (hide) {
                    this.dismiss(true);
                }
            } else {
                console.log('Splash already showing');
            }
        }
        this.dismiss = (auto) => {
            $holder.addClass(`dismiss-${auto ? 'auto': 'now'}`);
        }
    },
    next: () => {
        const component = new Component('main', './components/main');
        app.setComponent(component);
        app.run();
    },
    run: () => {
        console.log('splash running');
    }
}