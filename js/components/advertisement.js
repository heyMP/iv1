module.exports = function() {
  (function ($) {
	  'use strict';

	  $(".iv1-ad__play, .iv1-ad__close").click(function(e) {
	  	e.preventDefault();

	  	console.log('click');
	    var videoContainer = $(this).parents('.iv1-ad');

	    // Add the is-open tag to the base element.
	    videoContainer.toggleClass('iv1-ad--is-open');

			videoContainer.find('*[data-iv1-ad-src]').each(function() {
				var video = $(this);
				if (videoContainer.hasClass('iv1-ad--is-open')) {
					// Give the animation enough time to complete.
					setTimeout(function() {
						startIframeVideo(video);
					}, 500);
				}
				else {
	    		stopIframeVideo(video);
	    	}
	    });
	  });

	  function startIframeVideo(video) {
			// Start the iframe videos.
			var videoIframeSrc = video.data('iv1-ad-src');
			// If it's a youtube or vimeo video then add an autoplay attr on the end
			// of the url.
			if (videoIframeSrc.indexOf('youtube') >= 0 || videoIframeSrc.indexOf('vimeo') >= 0) {
				// Find out if we need to fstart the query parameter or add
				// on to an existing one.
		  	if (videoIframeSrc.indexOf('?') >= 0) {
		  		videoIframeSrc += '&autoplay=1';
		  	}
		  	else {
		  		videoIframeSrc += '?autoplay=1';
		  	}
			}
			// Add it to the source attribute to load the video.
			video.attr('src', videoIframeSrc);
	  }

	  function stopIframeVideo(video) {
	  	video.attr('src', '');
	  }
  })(jQuery);
};