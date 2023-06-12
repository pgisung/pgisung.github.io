// html 문서를 다 읽고난 후에 실행함
$(function () {
    // Trigger
    $('.trigger').click(function () {
        $(this).toggleClass('active')
        $('.gnb').toggleClass('active')
    })
    $('section, .menu a').click(function () {
        $('.trigger').removeClass('active')
        $('.gnb').removeClass('active')
    })

    // Smooth Scrolling
    $('.menu a, .gototop').click(function (e) {
        $.scrollTo(this.hash || 0, 900)
    })

    // Change CSS with Scroll
    $(window).scroll(function () {
        if ($(window).scrollTop() > 50) {
            $('header, .gototop').addClass('active')
        } else {
            $('header, .gototop').removeClass('active')
        }
    })

    // Slick.js : plan history
    $('.history-slider').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 2,
    });

    // Slick.js : project photo
    $('.project-photo').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: 'linear'
    });
})