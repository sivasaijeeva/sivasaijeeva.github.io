var verticalSlider = {
    scrollThreshold: 1,
    sectionsContainer: null,
    sections: null,
    delta: 0,
    animating: false,
    currentSection: null,
    animationsSettings: {
        visible: 'translateNone',
        top: 'translateUp.half',
        bottom: 'translateDown',
        easing: 'easeInCubic',
        duration: 800
    },
    init: function () {
        var _this = this;
        this.sectionsContainer = $('.vs-slider');
        this.sections = $('.vs-section');
        this.currentSection = this.sections.filter('.active');
        if (Modernizr.mq('only screen and (max-width: 1200px)')) {
            _this.sectionsContainer.height($(window).height());
        }
        setTimeout(function () {
            _this.currentSection.velocity(_this.animationsSettings.visible, 0);
            if (_this.currentSection.prevAll('.vs-section').index() > -1) {
                _this.currentSection.prevAll('.vs-section').css('opacity', 1).velocity(_this.animationsSettings.top, 0);
            }
            if (_this.currentSection.nextAll('.vs-section').index() > -1) {
                _this.currentSection.nextAll('.vs-section').css('opacity', 1).velocity(_this.animationsSettings.bottom, 0);
            }
            _this.bindEvents();
        }, 100);
    },
    prev: function () {
        this.moveTo(this.currentSection.index() - 1);
    },
    next: function () {
        this.moveTo(this.currentSection.index() + 1);
    },
    moveTo: function (sectionIndex) {
        var _this = this;
        var nextSection;
        var animation;
        if (!this.animating && this.currentSection.index() !== sectionIndex) {
            _this.animating = true;
            if (sectionIndex > -1 && sectionIndex < _this.sections.length) {
                if (sectionIndex > _this.currentSection.index()) {
                    nextSection = _this.currentSection.next('.vs-section');
                    animation = _this.animationsSettings.top;
                } else {
                    nextSection = _this.currentSection.prev('.vs-section');
                    animation = _this.animationsSettings.bottom;
                }
                _this.currentSection.removeClass('active').velocity(animation, _this.animationsSettings.easing, _this.animationsSettings.duration);
                nextSection.addClass('active').velocity(_this.animationsSettings.visible, _this.animationsSettings.easing, _this.animationsSettings.duration, function () {
                    _this.animating = false;
                    _this.currentSection = nextSection;
                });
            } else {
                if (sectionIndex <= -1) {
                    _this.currentSection.velocity('bounceDown', _this.animationsSettings.easing, 400, function () {
                        _this.animating = false;
                    });
                } else if (sectionIndex >= _this.sections.length) {
                    _this.currentSection.velocity('bounceUp', _this.animationsSettings.easing, 400, function () {
                        _this.animating = false;
                    });
                }
            }
        } else {
            return false;
        }
    },
    bindEvents: function () {
        var _this = this;
        if (Modernizr.mq('only screen and (max-width: 1200px)')) {
            $(window).on('resize', function () {
                _this.sectionsContainer.height($(window).height());
            });
        }
        $(window).on('DOMMouseScroll mousewheel', function (event) {
            if (event.originalEvent.detail < 0 || event.originalEvent.wheelDelta > 0) {
                _this.delta--;
                if (Math.abs(_this.delta) >= _this.scrollThreshold) {
                    _this.prev();
                } else {
                    return false;
                }
            } else {
                _this.delta++;
                if (_this.delta >= _this.scrollThreshold) {
                    _this.next();
                } else {
                    return false;
                }
            }
            delta = 0;
            return false;
        });
        $(document).on('keyup', function (event) {
            if (event.which == '40') {
                _this.next();
            } else if (event.which == '38') {
                _this.prev();
            }
        });
        if (Modernizr.touch) {
            var hammerVS = new Hammer(_this.sectionsContainer[0]);
            hammerVS.get('swipe').set({
                direction: Hammer.DIRECTION_VERTICAL
            });
            hammerVS.on('swipeup', function () {
                _this.next();
            });
            hammerVS.on('swipedown', function () {
                _this.prev();
            });
            var hammerVSprev = new Hammer($('.vs-prev')[0]);
            var hammerVSnext = new Hammer($('.vs-next')[0]);
            hammerVSprev.on('tap', function () {
                _this.prev();
            });
            hammerVSnext.on('tap', function () {
                _this.next();
            });
        } else {
            $('.vs-prev').on('click', function () {
                _this.prev();
            });
            $('.vs-next').on('click', function () {
                _this.next();
            });
        }
    }
};
$.Velocity.RegisterEffect('translateNone', {
    defaultDuration: 1,
    calls: [[{
        translateZ: 0,
        translateY: '0%',
        opacity: 1
    }, 1]]
});
$.Velocity.RegisterEffect('translateDown', {
    defaultDuration: 1,
    calls: [[{
        translateZ: 0,
        translateY: '100%'
    }, 1]]
});
$.Velocity.RegisterEffect('translateUp.half', {
    defaultDuration: 1,
    calls: [[{
        translateZ: 0,
        translateY: '-50%'
    }, 1]]
});
$.Velocity.RegisterEffect('bounceDown', {
    defaultDuration: 1,
    calls: [[{
        translateZ: 0,
        translateY: '10%'
    }, 1], [{
        translateZ: 0,
        translateY: '0%'
    }, 1]]
});
$.Velocity.RegisterEffect('bounceUp', {
    defaultDuration: 1,
    calls: [[{
        translateZ: 0,
        translateY: '-10%'
    }, 1], [{
        translateZ: 0,
        translateY: '0%'
    }, 1]]
});