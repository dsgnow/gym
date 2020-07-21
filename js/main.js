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