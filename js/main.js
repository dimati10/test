$(function () {

    $('.menu__btn').on('click', function () {
        $('.menu__btn').toggleClass('active');
        $('.menu__list').toggleClass('active');
    });

    $('.menu__link').on('click', function () {
        $('.menu__btn').removeClass('active');
        $('.menu__list').removeClass('active');
    });

});