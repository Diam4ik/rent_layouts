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
	//$("body").append("<img src=\"psd/1.jpg\" class=\"ov\">");

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
	var clientHeight = document.documentElement.clientHeight;
	var scrollTop = 0;
	var widthTablet = 767;
	var isShowLoginPanel = true;
	var isShowRegisterPanel = false;

	$('.btn_login').on('click', function (e) {
		if (clientWidth > widthTablet) {
			//типо десктоп
			//выполняем валидацию формы и отправку (пока временно ничего не делаем)
			//e.preventDefault();
		} else {
			if (!isShowLoginPanel) {
				$('.header-btn').removeClass('active');
				$(this).addClass('active');
				$('.js-login-accordion').slideDown(function () {
					setLoginPageHeight();
				});
				$('.js-registration-accordion').slideUp();
				isShowLoginPanel = true;
				isShowRegisterPanel = false;
				//e.preventDefault();
			} else {
				//выполняем валидацию формы и отправку (пока временно ничего не делаем)
				//e.preventDefault();
			}
		}
	});
	$('.btn_reg').on('click', function (e) {
		if (clientWidth > widthTablet) {
			//типо десктоп
			//выполняем валидацию формы и отправку (пока временно ничего не делаем)
			//e.preventDefault();
		} else {
			if (!isShowRegisterPanel) {
				$('.header-btn').removeClass('active');
				$(this).addClass('active');
				$('.js-login-accordion').slideUp();
				$('.js-registration-accordion').slideDown(function () {
					setLoginPageHeight();
				});
				isShowLoginPanel = false;
				isShowRegisterPanel = true;
				//e.preventDefault();
			} else {
				//выполняем валидацию формы и отправку (пока временно ничего не делаем)
				//e.preventDefault();
			}
		}
	});

	function toggleVisibleLoginAndRegistrationPanel() {
		if (clientWidth <= widthTablet) {
			if (isShowLoginPanel) {
				$('.js-registration-accordion').hide();
				$('.btn_login').addClass('active');
			}
			if (isShowRegisterPanel) {
				$('.js-login-accordion').hide();
				$('.btn_reg').addClass('active');
			}
		} else {
			$('.js-registration-accordion').css('display', 'block');
			$('.js-login-accordion').css('display', 'block');
            $('.toggle-menu-btn').removeClass('active');
            $('.nav').removeClass('open');
		}
	}

	toggleVisibleLoginAndRegistrationPanel();

	function setLoginPageHeight() {
		var defaultBottomIndent = clientWidth > widthTablet ? 30 : 50;
		var $loginInner = $('.login_inner, .page_wrap_height');
		var $loginWrapItem = $('.login_wrap_item, .page_wrap_height');
		if ($loginInner.length > 0) {
			var availableHeight = clientHeight - $loginInner.offset().top - defaultBottomIndent;
			var availableMinHeight = 0;
			if ($loginWrapItem.length > 0) {
				$loginWrapItem.css('height', 'auto');
				$loginWrapItem.each(function () {
					if ($(this).is(':visible')) {
						var loginWrapItemHeight = $(this).outerHeight();
						if (loginWrapItemHeight > availableMinHeight) {
							availableMinHeight = loginWrapItemHeight;
						}
					}
				});
				if (availableHeight > availableMinHeight) {
					$loginWrapItem.each(function () {
						if ($(this).is(':visible')) {
							$(this).css('height', availableHeight);
						}
					});
				} else {
					$loginWrapItem.each(function () {
						if ($(this).is(':visible')) {
							$(this).css('height', availableMinHeight);
						}
					});
				}
			} else {
				$loginInner.css('height', availableHeight);
			}
		}
	}

	setLoginPageHeight();
    var navCenter = $('.nav_inner').innerHeight();
	$(window).on("resize", function () {
		clientWidth = document.documentElement.clientWidth;
		clientHeight = document.documentElement.clientHeight;
        navCenter = $('.nav_inner').innerHeight();
		toggleVisibleLoginAndRegistrationPanel();
		setLoginPageHeight();
	}).on('scroll', function () {
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;

		if (clientWidth <= widthTablet) {
			if (scrollTop > 0) {
				$('.page-title-wrapper').addClass('sticked');
			} else {
				$('.page-title-wrapper').removeClass('sticked');
			}
			setLoginPageHeight();
		}
	});

	$('body').on('click', function (e) {
		if (!$(e.target).closest('.h_profile_wrap').length) {
			$('.profile_name').removeClass('active');
			$('.profile_logout').removeClass('open');
		}
	});

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

	$('.open_print').on("click", function () {
		window.print();
	});

	$('.profile_name').click(function () {
		$(this).toggleClass('active');
		$('.profile_logout').toggleClass('open');
	});

	$(".open_popup").fancybox({
		maxWidth: 700,
		width: '90%',
		padding: 0,
		margin: 0,
		helpers: {
			overlay: {
				locked: false
			}
		}
	});

    $('.nav_inner').css('margin-top', -(navCenter/2));

});