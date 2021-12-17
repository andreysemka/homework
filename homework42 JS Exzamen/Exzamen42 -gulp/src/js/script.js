//слайдер 4 секция
$(document).ready(function () {


    $(".js__news-slider").slick({
        autoplay: false,
        dots: true,
        infinite: true,
        cssEase: "linear",
        slidesToShow: 3,
        slidesToScroll: 1,
        variableWidth: true,
        arrows: false
    });
    $(".js__prev").click(function () {
        $(".js__news-slider").slick("slickPrev");
    });
    $(".js__next").click(function () {
        $(".js__news-slider").slick("slickNext");
    });

    $(".news__card").on("click", function () {
        const src = $(this)
            .find(".news__img")
            .attr("src");
        const title = $(this)
            .find(".news__title")
            .text();
        const txt = $(this)
            .find(".news__text")
            .text();
        const author = $(this)
            .find(".author")
            .clone();
        $(".show-news__img").attr("src", src);
        $(".show-news__title").html(title);
        $(".show-news__text").html(txt);
        $(".show-news__author").html(author);
        $(".show-news").css("display", "flex");
    });
    $(".show-news__close").click(function () {
        $(".show-news").css("display", "none");
    });
});