;
(function() {

    'use strict';



    // iPad and iPod detection	
    var isiPad = function() {
        return (navigator.platform.indexOf("iPad") != -1);
    };

    var isiPhone = function() {
        return (
            (navigator.platform.indexOf("iPhone") != -1) ||
            (navigator.platform.indexOf("iPod") != -1)
        );
    };

    // Main Menu Superfish
    var mainMenu = function() {

        $('#fh5co-primary-menu').superfish({
            delay: 0,
            animation: {
                opacity: 'show'
            },
            speed: 'fast',
            cssArrows: true,
            disableHI: true
        });

    };

    // Parallax
    var parallax = function() {
        var ua = navigator.userAgent,
            isMobileWebkit = /WebKit/.test(ua) && /Mobile/.test(ua);
        if (!isMobileWebkit) {
            $(window).stellar({ horizontalScrolling: false });
        }
    };


    // Offcanvas and cloning of the main menu
    var offcanvas = function() {

        var $clone = $('#fh5co-menu-wrap').clone();
        $clone.attr({
            'id': 'offcanvas-menu'
        });
        $clone.find('> ul').attr({
            'class': '',
            'id': ''
        });

        $('#fh5co-page').prepend($clone);

        // click the burger
        $('.js-fh5co-nav-toggle').on('click', function() {

            if ($('body').hasClass('fh5co-offcanvas')) {
                $('body').removeClass('fh5co-offcanvas');
            } else {
                $('body').addClass('fh5co-offcanvas');
            }
            // $('body').toggleClass('fh5co-offcanvas');

        });

        $('#offcanvas-menu').css('height', $(window).height());

        $(window).resize(function() {
            var w = $(window);


            $('#offcanvas-menu').css('height', w.height());

            if (w.width() > 769) {
                if ($('body').hasClass('fh5co-offcanvas')) {
                    $('body').removeClass('fh5co-offcanvas');
                }
            }

        });

    }



    // Click outside of the Mobile Menu
    var mobileMenuOutsideClick = function() {
        $(document).click(function(e) {
            var container = $("#offcanvas-menu, .js-fh5co-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('fh5co-offcanvas')) {
                    $('body').removeClass('fh5co-offcanvas');
                }
            }
        });
    };


    // Animations

    var contentWayPoint = function() {
        var i = 0;
        $('.animate-box').waypoint(function(direction) {

            if (direction === 'down' && !$(this.element).hasClass('animated')) {

                i++;

                $(this.element).addClass('item-animate');
                setTimeout(function() {

                    $('body .animate-box.item-animate').each(function(k) {
                        var el = $(this);
                        setTimeout(function() {
                            el.addClass('fadeInUp animated');
                            el.removeClass('item-animate');
                        }, k * 200, 'easeInOutExpo');
                    });

                }, 100);

            }

        }, { offset: '85%' });
    };


    var scheduleTab = function() {
        $('.schedule-container').css('height', $('.schedule-content.active').outerHeight());

        $(window).resize(function() {
            $('.schedule-container').css('height', $('.schedule-content.active').outerHeight());
        });

        $('.schedule a').on('click', function(event) {

            event.preventDefault();

            var $this = $(this),
                sched = $this.data('sched');

            $('.schedule a').removeClass('active');
            $this.addClass('active');
            $('.schedule-content').removeClass('active');

            $('.schedule-content[data-day="' + sched + '"]').addClass('active');

        });
    };

    var loopCoachImages = function() {
        var coaches = $('.coach-images');
        var bottomImage, topImage;
        if (coaches.length > 0) {
            bottomImage = coaches.find('.bottom');
            topImage = coaches.find('.top');
            topImage.css('width', bottomImage.width() + 'px');
            setInterval(function() {
                topImage.css('opacity', parseInt(topImage.css('opacity')) === 0 ? 1 : 0);
            }, 4000);
        }
    }

    var setupMessageForm = function() {
        var sendMessage = function(values) {
            var $form = $('#hidden_message_form');
            var $box = $('.message-box');
            $box.html('<div class="text-center">Sending message...</div>');
            $form.find("input[type='email']").val(values.messageEmail);
            $form.find('textarea').text(values.messageName + ' left a message:\n' + values.messageBody);
            $form.submit();
            setTimeout(function() {
                $box.html('<div class="text-center"><h3>Thank you!</h3>We will get back to you as soon as possible</div>');
            }, 2000);
            console.log(values);
        };
        var clearValidation = function() {
            $('.invalid-input').remove();
        }
        var $form = $('#message_form');
        if ($form.length > 0) {
            $form.submit(function(e) {
                e.preventDefault();
                var isValid = true;
                var $inputs = $form.find("input:text, input[type='email'], textarea");
                $inputs.on('blur', function() {
                    clearValidation();
                });
                var values = {};
                clearValidation();
                $inputs.each(function() {
                    var $value = $(this);
                    if ($value.val().length === 0) {
                        $value.focus();
                        $('<div class="invalid-input">Missing ' + this.name.replace('message', '') + '</div>').insertAfter($value);
                        isValid = false;
                        return false;
                    }
                    values[this.name] = $(this).val();
                });
                if (isValid) {
                    sendMessage(values);
                }
            });
        }
    }

    // Document on load.
    $(function() {
        mainMenu();
        parallax();
        offcanvas();
        mobileMenuOutsideClick();
        contentWayPoint();
        scheduleTab();
        loopCoachImages();
        setupMessageForm();
    });


}());

function expand(section) {
    var box = $('.' + section);
    box.find('.learn').hide();
    box.find('.description.short').hide();
    box.find('.long').show();
}