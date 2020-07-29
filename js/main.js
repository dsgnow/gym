// hamburger //
const hambPop = document.querySelector('.navBurger');
const hambButton = document.querySelector('.navBurgerBox__btn');
const hambSpan = document.querySelectorAll('.navBurgerBox__span');
const boxBurger = document.querySelector('.navBurgerBox');

let hambActiveFlag = false;
let mql = window.matchMedia("(orientation: portrait)");

if (mql.matches) {
    hambSpan.forEach(function (hambSpan) {
        hambSpan.classList.add('navBurgerBox__span--white');
    })
} else {
    hambSpan.forEach(function (hambSpan) {
        hambSpan.classList.add('navBurgerBox__span--white');
    })
}

const navAllLinks = document.querySelectorAll('.nav__link');
navAllLinks.forEach(function (navLink) {
    navLink.addEventListener('click', function (e) {
        e.preventDefault();
        const goToSection = "[data-sectionin=" + this.dataset.section + "]";
        document.querySelector(goToSection).scrollIntoView({
            behavior: 'smooth'
        });

    })
})

const navAllBurgerLinks = document.querySelectorAll('.navBurger__link');
navAllBurgerLinks.forEach(function (navBurgerLink) {
    navBurgerLink.addEventListener('click', function (e) {
        e.preventDefault();
        hambActiveFlag = !hambActiveFlag;
        hambButton.classList.toggle('navBurgerBox__btn--active');
        hambButton.classList.toggle('navBurgerBox__btn--notActive');
        hambPop.classList.toggle('navBurger--show');
        hambPop.classList.toggle('navBurger--hide');

        const goToSection = "[data-sectionin=" + this.dataset.section + "]";
        document.querySelector(goToSection).scrollIntoView({
            behavior: 'smooth'
        });
    })
})

boxBurger.addEventListener('click', function (e) {
    e.preventDefault();
    hambButton.classList.toggle('navBurgerBox__btn--active');
    hambButton.classList.toggle('navBurgerBox__btn--notActive');

    hambPop.classList.toggle('navBurger--show');
    hambPop.classList.toggle('navBurger--hide');
    hambPop.style.display = 'block';
})

// changes on scrolll //
window.addEventListener('scroll', function () {

    var isSafari = window.safari !== undefined;
    let bodyelem = '';

    if (isSafari) {
        bodyelem = document.querySelector('body')
    } else {
        bodyelem = window;
    }

    const windowHeight = bodyelem.innerHeight;
    const scrollValue = bodyelem.scrollY;
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
const btnMeetUs = document.querySelector('.columnTexts__btn');
const plansBtns = document.querySelectorAll('.columnOfferPlans__btn');

btnMeetUs.addEventListener('click', function (e) {
    e.preventDefault();
    const goToSection = "[data-sectionin=nav__link--about]";
    document.querySelector(goToSection).scrollIntoView({
        behavior: 'smooth'
    });

})

plansBtns.forEach(function (planBtn) {

    planBtn.addEventListener('click', function (e) {
        e.preventDefault();

        const chooseOffer = document.querySelector('.contact__dropdown');
        if (this.classList.contains('columnOfferPlans__btn--starter')) {
            chooseOffer.value = 'starter';
        } else if (this.classList.contains('columnOfferPlans__btn--standard')) {
            chooseOffer.value = 'standard';
        } else if (this.classList.contains('columnOfferPlans__btn--premium')) {
            chooseOffer.value = 'premium';
        }

        const goToSection = "[data-sectionin=nav__link--contact]";
        document.querySelector(goToSection).scrollIntoView({
            behavior: 'smooth'
        });

    })
})