// hamburger //
const $hambPop = $('.navBurger');
const $hambButton = $('.navBurger__btn');
const $hambSpan = $('.navBurger__span');

const $navLinks = $('.nav__link');
let hambActiveFlag = false;
let mql = window.matchMedia("(orientation: portrait)");

if (mql.matches) {
    $hambSpan.addClass('navBurger__span--white');
    // $hambSpan.removeClass('navBurger__span--black');
} else {
    // $hambSpan.addClass('navBurger__span--black');
    $hambSpan.addClass('navBurger__span--white');
}

$('.navBurger a').on('click', function () {
    hambActiveFlag = !hambActiveFlag;
    $hambButton.toggleClass('navBurger__btn--active');
    $hambButton.toggleClass('navBurger__btn--notActive');
    $hambPop.toggleClass('navBurger--show');
    $hambPop.toggleClass('navBurger--hide');
    // $hambSpan.toggleClass('navBurger__span--black');

    const goToSection = "[data-sectionin=" + $(this).data('section') + "]";
    $('body, html').animate({
        scrollTop: $(goToSection).offset().top
    }, 500)
})

$('.navBurger__btn').on('click', function (e) {
    hambActiveFlag = !hambActiveFlag;
    e.preventDefault();
    $hambButton.toggleClass('navBurger__btn--active');
    $hambButton.toggleClass('navBurger__btn--notActive');
    // $hambSpan.toggleClass('navBurger__span--black');

    $hambPop.toggleClass('navBurger--show');
    $hambPop.toggleClass('navBurger--hide');
    $hambPop.show();
})

// swipe event //
class Swipe {
    constructor(element) {
        this.xDown = null;
        this.yDown = null;
        this.element = typeof (element) === 'string' ? document.querySelector(element) : element;

        this.element.addEventListener('touchstart', function (evt) {
            this.xDown = evt.touches[0].clientX;
            this.yDown = evt.touches[0].clientY;
        }.bind(this), false);

    }

    onLeft(callback) {
        this.onLeft = callback;

        return this;
    }

    onRight(callback) {
        this.onRight = callback;

        return this;
    }

    onUp(callback) {
        this.onUp = callback;

        return this;
    }

    onDown(callback) {
        this.onDown = callback;

        return this;
    }

    handleTouchMove(evt) {
        if (!this.xDown || !this.yDown) {
            return;
        }

        let xUp = evt.touches[0].clientX;
        let yUp = evt.touches[0].clientY;

        this.xDiff = this.xDown - xUp;
        this.yDiff = this.yDown - yUp;

        if (Math.abs(this.xDiff) > Math.abs(this.yDiff)) { // Most significant.
            if (this.xDiff > 0) {
                this.onLeft();
            } else {
                this.onRight();
            }
        } else {
            if (this.yDiff > 0) {
                this.onUp();
            } else {
                this.onDown();
            }
        }

        // Reset values.
        this.xDown = null;
        this.yDown = null;
    }

    run() {
        this.element.addEventListener('touchmove', function (evt) {
            this.handleTouchMove(evt);
        }.bind(this), false);
    }
}

const swiper = new Swipe('.columnOfferPlans__wrapOffer');
let offers = [...document.querySelectorAll('.columnOfferPlans__offer')];

const clearSwipe = function () {
    offers.forEach(function (offer, index) {
        if (offer.classList.contains('columnOfferPlans__offer--active')) {
            planIndex = index;
        }
        offers[planIndex].classList.remove('columnOfferPlans__offer--active');
    });

    document.querySelector('.columnOfferPlans__wrapOffer').classList.toggle('columnOfferPlans__wrapOffer--active');
}

swiper.onLeft(function () {

    clearSwipe();

    if (planIndex !== offers.length - 1) {
        offers[planIndex + 1].classList.add('columnOfferPlans__offer--active');
        planIndex++;
    } else if (planIndex == offers.length - 1) {
        offers[0].classList.add('columnOfferPlans__offer--active');
        planIndex++;
    }

});

swiper.onRight(function () {

    clearSwipe();

    if (planIndex !== 0) {
        offers[planIndex - 1].classList.add('columnOfferPlans__offer--active');
        planIndex--;
    } else if (planIndex == 0) {
        offers[2].classList.add('columnOfferPlans__offer--active');
        planIndex == 2;
    }

});

swiper.run();