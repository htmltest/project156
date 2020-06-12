$(document).ready(function() {

    $('.dashboard-zone-dates-item a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.dashboard-zone-dates-item.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = $('.dashboard-zone-dates-item').index(curLi);
            $('.dashboard-zone-content.active').removeClass('active');
            $('.dashboard-zone-content').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('body').on('click', '.support-search-link', function(e) {
        $('html').addClass('support-search-open');
        $('.support-search-window-input input').trigger('focus');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.support-search').length == 0) {
            $('html').removeClass('support-search-open');
        }
    });

    $('body').on('click', '.card-item-menu-icon', function(e) {
        $(this).parent().parent().toggleClass('open');
        $('header').addClass('header-up');
    });
    
    $('.meets-dates a').click(function(e) {
        var curLink = $(this);
        if (!curLink.hasClass('active')) {
            $('.meets-dates a.active').removeClass('active');
            curLink.addClass('active');
            var curIndex = $('.meets-dates a').index(curLink);
            $('.meets-content.active').removeClass('active');
            $('.meets-content').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

});