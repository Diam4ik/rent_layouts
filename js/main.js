$(function () {
    $('input[type="text"], input[type="email"], input[type="tel"], textarea').focus(function () {
        if ($(this).val() == $(this).attr("title")) {
            $(this).val("");
        }
    }).blur(function () {
                if ($(this).val() == "") {
                    $(this).val($(this).attr("title"));
                }
            });

    // todo del for production
    $("body").append("<img src=\"psd/1.jpg\" class=\"ov\">");

    var $tabItem = $('.analysis-tab-item');
    var $tabContent = $('.analysis-content-panel');
    var selectedStyle = 'selected';

    function tabsInit() {
        var ind = 0;
        $tabItem.each(function () {
            if ($(this).hasClass(selectedStyle)) {
                ind = $(this).index();
            }
        });
        $tabContent.hide();
        $tabContent.eq(ind).show();
    }

    tabsInit();

    $tabItem.click(function () {
        var _ = $(this);
        var ind = _.index();

        if (!_.hasClass(selectedStyle)) {
            $tabItem.removeClass(selectedStyle);
            _.addClass(selectedStyle);
            $tabContent.hide();
            $tabContent.eq(ind).show();
        }
    });

    $('.toggle-menu-btn').click(function () {
        $(this).toggleClass('active');
        $('.nav').toggleClass('open');
    });

    var clientWidth = document.documentElement.clientWidth;
    var maxWidthMobileView2 = 767;
    var isShowLoginPanel = true;
    var isShowRegisterPanel = false;
    $(window).on("resize", function () {
        clientWidth = document.documentElement.clientWidth;
        toggleVisibleLoginAndRegistrationPanel();
    });

    $('.btn_login').on('click', function (e) {
        if (clientWidth > maxWidthMobileView2) {
            //типо десктоп
            //выполняем валидацию формы и отправку (пока временно ничего не делаем)
//            e.preventDefault();
        } else {
            if (!isShowLoginPanel) {
                $('.inner_title').removeClass('active');
                $(this).addClass('active');
                $('.js-login-accordion').slideDown();
                $('.js-registration-accordion').slideUp();
                isShowLoginPanel = true;
                isShowRegisterPanel = false;
//                e.preventDefault();
            } else {
                //выполняем валидацию формы и отправку (пока временно ничего не делаем)
//                e.preventDefault();
            }
        }
    });
    $('.btn_reg').on('click', function (e) {
        if (clientWidth > maxWidthMobileView2) {
            //типо десктоп
            //выполняем валидацию формы и отправку (пока временно ничего не делаем)
//            e.preventDefault();
        } else {
            if (!isShowRegisterPanel) {
                $('.inner_title').removeClass('active');
                $(this).addClass('active');
                $('.js-login-accordion').slideUp();
                $('.js-registration-accordion').slideDown();
                isShowLoginPanel = false;
                isShowRegisterPanel = true;
//                e.preventDefault();
            } else {
                //выполняем валидацию формы и отправку (пока временно ничего не делаем)
//                e.preventDefault();
            }
        }
    });
    function toggleVisibleLoginAndRegistrationPanel() {
        if (clientWidth <= maxWidthMobileView2) {
            if (isShowLoginPanel) {
                $('.js-registration-accordion').hide();
                $('.btn_login').addClass('active');
            }
            if (isShowRegisterPanel) {
                $('.js-login-accordion').hide();
                $('.btn_reg').addClass('active');
            }
        } else {
            $('.js-registration-accordion').removeAttr('style');
            $('.js-login-accordion').removeAttr('style');
        }
    }

    toggleVisibleLoginAndRegistrationPanel();

    function setHeight() {
        var clientHeight = document.documentElement.clientHeight;
        var headerHeight =  $('.header').height();
        var titleHeight =  $('.mob_title').outerHeight();
        var contentHeight = clientHeight - headerHeight - titleHeight - 50 - 82 ;
        $('.login_inner').css("min-height", contentHeight);
    }

    setHeight();

    function setHeightPage() {
        var clientHeight = document.documentElement.clientHeight;
        var headerHeight =  $('.header').height();
        var titleHeight =  $('.header_title').outerHeight();
        var titleNoteHeight =  $('.header_title_note').outerHeight();
        var titleProfHeight =  $('.prof_title').outerHeight();
        var contentHeight = clientHeight - headerHeight - titleHeight - titleProfHeight - titleNoteHeight - 61 ;
//        $('.page_inner').css("min-height", contentHeight);
        $('.page_wrap').css("min-height", contentHeight);
        $('.profile_wrap').css("min-height", contentHeight);
        $('.page_wrap_height').css("min-height", contentHeight);
//        $('.admin_table').css("min-height", contentHeight);
    }

    setHeightPage();

    $(window).on("resize", function () {
        setHeightPage();
        setHeight();
        setPanelHeight();
//        setHeightInner();
    });

    var widthTablet = 767;
    function setPanelHeight() {
        var el = $('.login_wrap_item');
        if (el.length) {
            el.removeAttr('style');
            if (clientWidth > widthTablet) {
                var maxHeight = 0;
                el.each(function () {
                    var $height = $(this).height();
                    if ($height > maxHeight) {
                        maxHeight = $height;
                    }
                });
                el.height(maxHeight);
            }
        }
    }

    setPanelHeight();

    $("#from").datepicker({
        defaultDate: "+1w",
        buttonImage: "img/calendar.png",
        showOn: "both",
        buttonImageOnly: true,
        numberOfMonths: 1,
        onClose: function (selectedDate) {
            $("#to").datepicker("option", "minDate", selectedDate);
        }
    });

    $("#to").datepicker({
        defaultDate: "+1w",
        showOn: "both",
        buttonImageOnly: true,
        buttonImage: "img/calendar.png",
        numberOfMonths: 1,
        onClose: function (selectedDate) {
            $("#from").datepicker("option", "maxDate", selectedDate);
        }
    });

    $('.open_print').on( "click", function(){
        window.print();
    });


    $('.profile_name').click(function () {
        $(this).toggleClass('active');
        $('.profile_logout').toggleClass('open');
    });

    $('body').on('click', function (e) {
        if (!$(e.target).closest('.h_profile_wrap').length) {
            $('.profile_name').removeClass('active');
            $('.profile_logout').removeClass('open');
        }
    });

        $(".open_popup").fancybox({
        maxWidth	: 700,
        width		: '90%',
        padding : 0,
        margin : 0,
        helpers:  {
            overlay : {
                locked : false
            }
        }
    });

//    function setHeightInner() {
//        var headerHeight =  $('.page_wrap').height();
//        $('.page_wrap_height').css("min-height", headerHeight);
//    }

//    setHeightInner();

});