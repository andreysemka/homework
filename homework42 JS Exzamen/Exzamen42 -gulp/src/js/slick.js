$(document).ready(function () {
    $(".js_news__slider").slick({
        autoplay: false,
        dots: true,
        infinite: true,
        cssEase: "linear",
        slidesToShow: 3,
        slidesToScroll: 1,
        variableWidth: true,
        arrows: false
    });
    $(".js_prev").click(function () {
        $(".js_news__slider").slick("slickPrev");
    });
    $(".js_next").click(function () {
        $(".js_news__slider").slick("slickNext");
    });
}