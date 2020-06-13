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

    $('body').on('mouseover', '.manager-table-arrow-left', function(e) {
        $(this).parent().find('.manager-table-wrapper').mCustomScrollbar('stop').mCustomScrollbar('scrollTo', 'left', {
            timeout: 0,
            scrollEasing: 'linear'
        });
    });

    $('body').on('mouseover', '.manager-table-arrow-right', function(e) {
        $(this).parent().find('.manager-table-wrapper').mCustomScrollbar('stop').mCustomScrollbar('scrollTo', 'right', {
            timeout: 0,
            scrollEasing: 'linear'
        });
    });

    $('body').on('mouseover', '.manager-table-section', function(e) {
        var curBlock = $(this);
        $('.wrapper').append('<div class="manager-table-section-detail-window" style="left:' + curBlock.offset().left + 'px; top:' + curBlock.offset().top + 'px">' + curBlock.find('.manager-table-section-detail').html() + '</div>');
    });

    $('body').on('mouseout', '.manager-table-section', function(e) {
        $('.manager-table-section-detail-window').remove();
    });

    $('body').on('change', '.manager-table-head-checkbox input', function(e) {
        var curTable = $(this).parents().filter('.manager-table');
        if (curTable.find('.manager-table-head-checkbox input:checked').length == 1) {
            curTable.find('.manager-table-cell-checkbox input').prop('checked', true);
        } else {
            curTable.find('.manager-table-cell-checkbox input').prop('checked', false);
        }
    });

    $('body').on('change', '.manager-table-cell-checkbox input', function(e) {
        var curTable = $(this).parents().filter('.manager-table');
        if (curTable.find('.manager-table-cell-checkbox input:checked').length > 0) {
            curTable.find('.manager-table-head-checkbox input').prop('checked', true);
        } else {
            curTable.find('.manager-table-head-checkbox input').prop('checked', false);
        }
    });

    checkManagerTables();

    $('body').on('click', '.manager-table-filter-link', function() {
        $('html').toggleClass('manager-table-fitler-open');
    });

    $(document).click(function(e) {
        var isDatepicker = false;
        var curClass = $(e.target).attr('class');
        if ((curClass !== undefined && curClass.indexOf('datepicker') > -1) || $(e.target).parents().filter('[class^="datepicker"]').length > 0) {
            isDatepicker = true;
        }
        if ($(e.target).parents().filter('.manager-table-filter').length == 0 && !isDatepicker) {
            $('html').removeClass('manager-table-fitler-open');
        }
    });

    $('.manager-table-filter').each(function() {
        filterUpdate();
        $('.manager-table-filter .form-input-date input').each(function() {
            var myDatepicker = $(this).data('datepicker');
            if (myDatepicker) {
                myDatepicker.update('onSelect', function(formattedDate, date, inst) {
                    filterUpdate();
                });
            }
        });
    });

    $('body').on('change', '.manager-table-filter .form-checkbox input', function(e) {
        filterUpdate();
    });

    $('body').on('change', '.manager-table-filter .form-input-date input', function(e) {
        filterUpdate();
    });

    $('body').on('click', '.manager-table-filter-param span', function() {
        var curId = $(this).attr('data-id');
        var curField = $('.manager-table-filter-params-window *[data-id="' + curId + '"]');
        if (curField.parents().filter('.form-checkbox').length > 0) {
            curField.prop('checked', false);
            curField.trigger('change');
        }
        if (curField.hasClass('manager-table-filter-params-window-dates')) {
            curField.find('input').val('');
            curField.find('input').trigger('change');
        }
    });

    $('body').on('mouseover', '.manager-table-schedule .manager-table-row .manager-table-schedule-section', function() {
        var curCell = $(this);
        var curRow = curCell.parents().filter('.manager-table-row');
        var curTable = curCell.parents().filter('.manager-table-schedule');
        var curIndex = curRow.find('.manager-table-schedule-section').index(curCell);
        curTable.find('.manager-table-row').each(function() {
            $(this).find('.manager-table-schedule-section').eq(curIndex).addClass('hover');
        });
        curTable.find('.manager-table-head-schedule').eq(curIndex).addClass('hover');
    });

});

$(window).on('load resize', function() {
    $('.manager-table-wrapper').each(function() {
        var curWrapper = $(this);
        if ($(window).width() > 1169) {
            curWrapper.mCustomScrollbar({
                axis: 'x',
                mouseWheel: {
                    enable: false
                },
                keyboard: {
                    enable: false
                },
                scrollInertia: 0,
                contentTouchScroll: false,
                callbacks: {
                    onInit: function() {
                        curWrapper.parent().find('.manager-table-arrow-left').removeClass('visible');
                        curWrapper.parent().find('.manager-table-arrow-right').addClass('visible');
                    },

                    whileScrolling: function() {
                        if (this.mcs.leftPct == 100) {
                            curWrapper.parent().find('.manager-table-arrow-right').removeClass('visible');
                        } else {
                            curWrapper.parent().find('.manager-table-arrow-right').addClass('visible');
                        }

                        if (this.mcs.leftPct == 0) {
                            curWrapper.parent().find('.manager-table-arrow-left').removeClass('visible');
                        } else {
                            curWrapper.parent().find('.manager-table-arrow-left').addClass('visible');

                        }
                    }
                }
            });
        } else {
            curWrapper.mCustomScrollbar('destroy');
        }
    });

    resizeManagerTables();
});

function resizeManagerTables() {
    $('.manager-table-container').each(function() {
        var curContainer = $(this);
        var newHTML = '';
        curContainer.find('.manager-table-head-fixed').each(function() {
            newHTML += '<div class="manager-table-head" style="height:' + $(this).outerHeight() + 'px">' + $(this).html() + '</div>';
        });
        curContainer.find('.manager-table-cell-fixed').each(function() {
            newHTML += '<div class="manager-table-cell manager-table-cell-action" style="width:' + $(this).outerWidth() + 'px; height:' + $(this).outerHeight() + 'px">' + $(this).html() + '</div>';
        });
        curContainer.find('.manager-table-fixed').html(newHTML);
    });
}

function checkManagerTables() {
    $('.manager-table').each(function() {
        var curTable = $(this);
        if (curTable.find('.manager-table-cell-checkbox input:checked').length > 0) {
            curTable.find('.manager-table-head-checkbox input').prop('checked', true);
        } else {
            curTable.find('.manager-table-head-checkbox input').prop('checked', false);
        }
    });
}

$(window).on('load resize scroll', function() {
    var windowScroll = $(window).scrollTop();
    var windowHeight = $(window).height();

    $('.manager-table-arrow-right.visible .manager-table-arrow-right-inner').each(function() {
        var curArrow = $(this);
        var curParent = curArrow.parent();
        if (curParent.offset().top < windowScroll) {
            curArrow.css({'top': windowScroll - curParent.offset().top});
            if (curArrow.offset().top + curArrow.outerHeight() > curParent.offset().top + curParent.outerHeight()) {
                curArrow.css({'top': curParent.outerHeight() - curArrow.outerHeight() - 86});
            }
        }
    });

    $('.manager-table-arrow-left.visible .manager-table-arrow-left-inner').each(function() {
        var curArrow = $(this);
        var curParent = curArrow.parent();
        if (curParent.offset().top < windowScroll) {
            curArrow.css({'top': windowScroll - curParent.offset().top});
            if (curArrow.offset().top + curArrow.outerHeight() > curParent.offset().top + curParent.outerHeight()) {
                curArrow.css({'top': curParent.outerHeight() - curArrow.outerHeight() - 86});
            }
        }
    });
});

function filterUpdate() {
    var newHTML = '';
    var id = -1;

    if ($('.manager-table-filter-params-window-dates').length == 1) {
        id++;
        $('.manager-table-filter-params-window-dates').attr('data-id', id);
        var datesText = '';
        if ($('.filter-date-from').val() != '') {
            datesText += 'с ' + $('.filter-date-from').val();
        }
        if ($('.filter-date-to').val() != '') {
            if (datesText != '') {
                datesText += ' ';
            }
            datesText += 'по ' + $('.filter-date-to').val();
        }
        if (datesText != '') {
            newHTML += '<div class="manager-table-filter-param">' + datesText + '<span data-id="' + id + '"><svg width="7" height="7" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L4.5 4.5L8 1" stroke-width="1.2"/><path d="M8 8L4.5 4.5L1 8" stroke-width="1.2"/></svg></span></div>';
        }
        $('.manager-table-filter-params-window-dates .manager-table-filter-params-window-title .manager-table-filter-params-window-title-values').remove();
        $('.manager-table-filter-params-window-dates .manager-table-filter-params-window-title').append('<div class="manager-table-filter-params-window-title-values">' + datesText + '</div>');
    }

    var newText = '';
    for (var i = 0; i < $('.manager-table-filter .form-checkbox').length; i++) {
        var curInput = $('.manager-table-filter .form-checkbox').eq(i).find('input');
        id++;
        curInput.attr('data-id', id);
        if (curInput.prop('checked')) {
            newHTML += '<div class="manager-table-filter-param">' + curInput.parent().find('span').text() + '<span data-id="' + id + '"><svg width="7" height="7" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L4.5 4.5L8 1" stroke-width="1.2"/><path d="M8 8L4.5 4.5L1 8" stroke-width="1.2"/></svg></span></div>';
            if (newText != '') {
                newText += ', ';
            }
            newText += curInput.parent().find('span').text();
        }
    }
    $('.manager-table-filter-params-window-props .manager-table-filter-params-window-title .manager-table-filter-params-window-title-values').remove();
    $('.manager-table-filter-params-window-props .manager-table-filter-params-window-title').append('<div class="manager-table-filter-params-window-title-values">' + newText + '</div>');

    $('.manager-table-filter-params').html(newHTML);
}