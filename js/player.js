jQuery(function($) {
  if (!Modernizr.touch) { // if not a smartphone
    debiki.Utterscroll.enable();
  }
});

function resizeArtwork() {
	var containerWidth = $(".sc-player li.active").width();
	var containerHeight = $(".sc-player li.active").height();
	if (containerWidth > containerHeight) {
		$(".sc-player li.active img").addClass("bgheight");
		$(".sc-player li.active img").removeClass("bgwidth");
	} else {
		$(".sc-player li.active img").addClass("bgwidth");
		$(".sc-player li.active img").removeClass("bgheight");
	}
}

function resizeSpacers() {
	var newWidth = ($(window).width / 2 - $("#middle").width()/2) + 5000;
	$('.number-container li:first-child').css( 'width', newWidth );
}

function getImgColor(callback) {
	$(".sc-player li.active img").attr("data-adaptive-bg", "1");
	$(".sc-player li.active img").attr("crossOrigin", "");
	callback();
}

function getColor() {
	var defaults = {
		selector: '[data-adaptive-bg="1"]',
		parent:   '#player-container',
	};
	$.adaptiveBackground.run(defaults);
	if ($('#player-container').css('background-color;') == 'rgb(0, 0, 0)') {
		$.adaptiveBackground.run(defaults);
	}
}

function centerNumbers(myClass, duration) {
	var scrollMiddle = $(myClass).offset().left - ($(window).width()/2) + ($(myClass).width()/2) + 15;
	$('#draggable').animate({
        scrollLeft: scrollMiddle,
        opacity: 1
    }, duration, "easeOutCubic");
}

function checkNumbers() {
	$('#numbers li').each(function() {
        var centerDistance = $(this).offset().left - ($(window).width()/2) + ($(this).width()/2);
        var listWidth = $(this).width()/2 + 15;
     	if (centerDistance < listWidth && centerDistance > -listWidth) {
     		$(this).addClass('my-score');
     	} else {
     		$(this).removeClass('my-score');
     	}
	});
}

/* ---------------------------

		RUN

------------------------------ */

window.onload = function () {
	getImgColor(function() {
     	getColor();
     });
	centerNumbers(".number-container li.middle", 1000);

	resizeArtwork();
	resizeSpacers();

	$('#minimize-icon').click(function() {
		$('#player-container').toggleClass('minimized');
	});	

	$('#draggable').scroll(function() {
		checkNumbers();
	});
}

$(window).resize(function() {
	resizeArtwork();
	checkNumbers();
	resizeSpacers();
});