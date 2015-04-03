/*

jQuery(function($) {
  if (!Modernizr.touch) { // if not a smartphone
    debiki.Utterscroll.enable({
      scrollstoppers: 'nav, #djBtn, #songsBtn, #playingBtn' });
  }
});

*/

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

/*
function centerNumbers(myClass, duration) {
	var scrollMiddle = $(myClass).offset().left - ($('#player-container').width()/2) + ($(myClass).width()/2) + 15;
	$('#draggable').animate({
        scrollLeft: scrollMiddle,
        opacity: 1
    }, duration, "easeOutCubic");
}
*/

function centerNumbers(myClass, duration) {
	$('#draggable').animate({
	   scrollLeft: $(myClass).offset().left
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
	centerNumbers("#middle-number", 1000);

	resizeArtwork();
	resizeSpacers();

	$('#minimize-icon').click(function() {
		$('#player-container').toggleClass('minimized');
	});	

	$('#draggable').scroll(function() {
		checkNumbers();
	});

	$('#djBtn').click(function() {
		$('#main-parent').animate({
		   scrollLeft: 0
		}, 350, "easeOutCubic");
	});		

	$('#songsBtn').click(function() {
		$('#main-parent').animate({
		   scrollLeft: $("#main-parent").width()
		}, 350, "easeOutCubic");
	});	

	$('#playingBtn').click(function() {
		$('#main-parent').animate({
		   scrollLeft: $("#main-parent").width()*2
		}, 350, "easeOutCubic");
	});

	$('#main-parent').scroll(function() {
		var scrollPos = $("#scrollContainer").offset().left;
		var scrollPercent = -(scrollPos / $("#scrollContainer").width());
		var newMargin = $(window).width() * scrollPercent;
		$("#underline").css( 'left', newMargin);
		if (scrollPercent >= 0 && scrollPercent < 0.3) {
			$("#djBtn").addClass('selected');
			$("#songsBtn").removeClass('selected');
			$("#playingBtn").removeClass('selected');
			$("nav").removeClass("player");
		} 
		else if (scrollPercent >= 0.3 && scrollPercent < 0.6) {
			$("#djBtn").removeClass('selected');
			$("#songsBtn").addClass('selected');
			$("#playingBtn").removeClass('selected');
			$("nav").removeClass("player");
		} 
		else {
			$("#djBtn").removeClass('selected');
			$("#songsBtn").removeClass('selected');
			$("#playingBtn").addClass('selected');
			$("nav").addClass("player");
		}
	});
}

$(window).resize(function() {
	resizeArtwork();
	checkNumbers();
	resizeSpacers();
});

/* ---------------------------

		Click events

------------------------------ */