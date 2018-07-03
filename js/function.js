/*!
 *
 * Evgeniy Ivanov - 2018
 * busforward@gmail.com
 * Skype: ivanov_ea
 *
 */

var TempApp = {
    lgWidth: 1200,
    mdWidth: 992,
    smWidth: 768,
    resized: false,
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    touchDevice: function() { return navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i); }
};

function isLgWidth() { return $(window).width() >= TempApp.lgWidth; } // >= 1200
function isMdWidth() { return $(window).width() >= TempApp.mdWidth && $(window).width() < TempApp.lgWidth; } //  >= 992 && < 1200
function isSmWidth() { return $(window).width() >= TempApp.smWidth && $(window).width() < TempApp.mdWidth; } // >= 768 && < 992
function isXsWidth() { return $(window).width() < TempApp.smWidth; } // < 768
function isIOS() { return TempApp.iOS(); } // for iPhone iPad iPod
function isTouch() { return TempApp.touchDevice(); } // for touch device

$(document).ready(function() {

    // Хак для клика по ссылке на iOS
    if (isIOS()) {
        $(function(){$(document).on('touchend', 'a', $.noop)});
    }

	if ('flex' in document.documentElement.style) {
		// Хак для UCBrowser
		if (navigator.userAgent.search(/UCBrowser/) > -1) {
			document.documentElement.setAttribute('data-browser', 'not-flex');
		} else {		
		    // Flexbox-совместимый браузер.
			document.documentElement.setAttribute('data-browser', 'flexible');
		}
	} else {
	    // Браузер без поддержки Flexbox, в том числе IE 9/10.
		document.documentElement.setAttribute('data-browser', 'not-flex');
	}

    $('select').each(function() {
        if ($(this).attr('data-placeholder')) {
            $(this).select2({
                placeholder: $(this).data('placeholder'),
                allowClear: true,
                minimumResultsForSearch: -1,
                // language: "ru"
            });
        } else {
            $(this).select2({
                // language: "ru"
            });
        }
    });

    $('.company__select').on('select2:open', function() {
        var container = $('.select2-container').last();
        container.addClass('company__drop');
    });

    $('.filters__accordionToggl,.filters__accordionToggl label').on('click', function(event) {
        var item = $(this).closest('.filters__accordionItem');
        if ($(this).is('label')) {
            var checkbox = $(this).closest('.filters__accordionToggl').find('input:checkbox');
        } else {
            var checkbox = $(this).find('input:checkbox');
        }

        if (checkbox.attr('disabled')) {
            return false;
        }
        if (item.hasClass('open')) {
            item.removeClass('open');
            checkbox.prop('checked', false);
        } else {
            item.addClass('open');
            checkbox.prop('checked', true);
        }
    });

    $('.filters__accordionHider').on('click', '.link', function(event) {
        event.preventDefault();
        $('.filters__accordionItem').each(function() {
            if ($(this).hasClass('open')) {
                $(this).removeClass('open');
                $(this).find('.filters__accordionToggl input:checkbox').prop('checked', false);
            }
        });
    });

    $('.statistic .icon_carret').on('click', function() {
        var rowToggle = $(this).closest('.statistic__row');
        var rowNext = rowToggle.next('.statistic__drop');

        rowToggle.toggleClass('active');
        rowNext.toggleClass('open');
    });

    $('.comments__toggle').on('click', function(event) {
        $(this).closest('.comments__item').toggleClass('open');
    });

});

