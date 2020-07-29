// hamburger //
const $hambPop = $('.navBurger');
const $hambButton = $('.navBurgerBox__btn');
const $hambSpan = $('.navBurgerBox__span');

const $navLinks = $('.nav__link');
let hambActiveFlag = false;
let mql = window.matchMedia("(orientation: portrait)");

if (mql.matches) {
    $hambSpan.addClass('navBurgerBox__span--white');
    // $hambSpan.removeClass('navBurger__span--black');
} else {
    // $hambSpan.addClass('navBurger__span--black');
    $hambSpan.addClass('navBurgerBox__span--white');
}

$('nav a').on('click', function (e) {
    e.preventDefault();
    const goToSection = "[data-sectionin=" + $(this).data('section') + "]";
    $('body, html').animate({
        scrollTop: $(goToSection).offset().top
    }, 500)

})

$('.navBurger a').on('click', function () {
    hambActiveFlag = !hambActiveFlag;
    $hambButton.toggleClass('navBurgerBox__btn--active');
    $hambButton.toggleClass('navBurgerBox__btn--notActive');
    $hambPop.toggleClass('navBurger--show');
    $hambPop.toggleClass('navBurger--hide');
    // $hambSpan.toggleClass('navBurger__span--black');

    const goToSection = "[data-sectionin=" + $(this).data('section') + "]";
    $('body, html').animate({
        scrollTop: $(goToSection).offset().top
    }, 500)
})

$('.navBurgerBox').on('click', function (e) {
    hambActiveFlag = !hambActiveFlag;
    e.preventDefault();
    $hambButton.toggleClass('navBurgerBox__btn--active');
    $hambButton.toggleClass('navBurgerBox__btn--notActive');
    // $hambSpan.toggleClass('navBurger__span--black');

    $hambPop.toggleClass('navBurger--show');
    $hambPop.toggleClass('navBurger--hide');
    $hambPop.show();
})

// changes on scrolll //
$(window).on('scroll', function () {

    var isSafari = window.safari !== undefined;
    let bodyelem = '';

    if (isSafari) {
        bodyelem = $("body");
    } else {
        bodyelem = window;
    }


    const windowHeight = $(bodyelem).height();
    const scrollValue = $(bodyelem).scrollTop();

    const nav = document.querySelector('nav');
    // change nav color //
    if ((scrollValue < 50)) {
        nav.classList.remove('nav--transBgc');
        nav.classList.add('nav--basic');

    } else if ((scrollValue < windowHeight)) {
        nav.classList.add('nav--transBgc');
        nav.classList.remove('nav--basic');

    } else if ((scrollValue >= windowHeight) && (scrollValue < windowHeight * 2)) {
        nav.classList.remove('nav--solidBgc');

    } else if ((scrollValue >= windowHeight) && (scrollValue < windowHeight * 3)) {
        nav.classList.add('nav--solidBgc');

    } else if ((scrollValue >= windowHeight) && (scrollValue < windowHeight * 4)) {

    }


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
                // this.onUp();
            } else {
                // this.onDown();
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
const rightOfferClick = document.querySelector('.columnOfferPlans__navigation--right');
const leftOfferClick = document.querySelector('.columnOfferPlans__navigation--left');
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

const turnRight = function () {
    if (planIndex !== offers.length - 1) {
        offers[planIndex + 1].classList.add('columnOfferPlans__offer--active');
        planIndex++;
    } else if (planIndex == offers.length - 1) {
        offers[0].classList.add('columnOfferPlans__offer--active');
        planIndex++;
    }
}

const turnLeft = function () {
    if (planIndex !== 0) {
        offers[planIndex - 1].classList.add('columnOfferPlans__offer--active');
        planIndex--;
    } else if (planIndex == 0) {
        offers[2].classList.add('columnOfferPlans__offer--active');
        planIndex == 2;
    }
}

swiper.onLeft(function () {
    clearSwipe();
    turnRight();
});

swiper.onRight(function () {
    clearSwipe();
    turnLeft();
});

swiper.run();

rightOfferClick.addEventListener('click', function () {
    clearSwipe();
    turnRight();
});

leftOfferClick.addEventListener('click', function () {
    clearSwipe();
    turnLeft();
});

//button redirections//
const btnMeetUs = $('.columnTexts__btn');

const plansBtn = $('.columnOfferPlans__btn');
const planStarterBtn = $('.columnOfferPlans__btn--starter');
const planStandardBtn = $('.columnOfferPlans__btn--standard');
const planPremiumBtn = $('.columnOfferPlans__btn--premium');

btnMeetUs.on('click', function () {
    const goToSection = "[data-sectionin=nav__link--about]";
    $('body, html').animate({
        scrollTop: $(goToSection).offset().top
    }, 500)
})

plansBtn.on('click', function () {

    const chooseOffer = $('.contact__dropdown');
    if (this.classList.contains('columnOfferPlans__btn--starter')) {
        chooseOffer.val('starter');
    } else if (this.classList.contains('columnOfferPlans__btn--standard')) {
        chooseOffer.val('standard');
    } else if (this.classList.contains('columnOfferPlans__btn--premium')) {
        chooseOffer.val('premium');
    }

    const goToSection = "[data-sectionin=nav__link--contact]";
    $('body, html').animate({
        scrollTop: $(goToSection).offset().top
    }, 500)
})