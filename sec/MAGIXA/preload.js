$(window).on('load pageshow', function () {
    $('.preloader').removeClass("off");
    $('.preloader').addClass("on"); 
});    
$("a:not([href*=javascript]):not([href*=\\#]):not(.fancybox):not([target]):not([data-fancybox])").click(function() {
    $('.preloader').removeClass("on");
    $('.preloader').addClass("off"); 
    let url = $(this).attr('href');
    window.setTimeout(function() {
        window.location.href = url;
    }, 550);    
    return false;
});