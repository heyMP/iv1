(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
module.exports = function() {
  (function ($) {
	  'use strict';

	  var dialog = document.querySelector('dialog');
    var showDialogButton = document.querySelector('#show-dialog');
    if (! dialog.showModal) {
     dialogPolyfill.registerDialog(dialog);
    }
    showDialogButton.addEventListener('click', function() {
     dialog.showModal();
    });
    dialog.querySelector('.close').addEventListener('click', function() {
     dialog.close();
    });

  })(jQuery);
};
},{}],3:[function(require,module,exports){
var advertisement = require('./components/advertisement.js');
var dialog = require('./components/dialog.js');

(function ($) {
  'use strict';

  objectFit.polyfill({
      selector: 'img', // this can be any CSS selector
      fittype: 'cover', // either contain, cover, fill or none
      disableCrossDomain: 'true' // either 'true' or 'false' to not parse external CSS files.
  });

  // Vide video backgrounds
  if (typeof Drupal != 'undefined') {
    Drupal.behaviors.vide = {
      attach: function (context, settings) {
        // target any element with the data-vide attribute
        $('*[data-vide]').each(function() {
          // get the defined video name from the data-vide-src attribute
          var videSrc = $(this).data('vide-src');
          $(this).vide(videSrc);
        });
      }
    };
  }
  else {
    $(document).ready(function() {
      // target any element with the data-vide attribute
      $('*[data-vide]').each(function() {
        // get the defined video name from the data-vide-src attribute
        var videSrc = $(this).data('vide-src');
        $(this).vide(videSrc);
      });
    });
  }

  // Advertisement
  if (typeof Drupal != 'undefined') {
    Drupal.behaviors.advertisement = {
      attach: function (context, settings) {
        advertisement();
      }
    };
  }
  else {
    $(document).ready(function() {
      advertisement();
    });
  }

  // image background
  if (typeof Drupal != 'undefined') {
    Drupal.behaviors.imageBackground = {
      attach: function (context, settings) {
        $('*[data-image-bg]').each(function() {
          var imageBackgroundSrc = $(this).find('img').attr('src');
          var backgroundPos = $(this).data('image-pos');
          $(this).find('img').removeAttr('src');
          $(this).css({
            backgroundImage: "url(" + imageBackgroundSrc + ")",
            backgroundSize: 'cover',
            backgroundPosition: '50% 50%'
          });
        });
      }
    };
  }
  else {
    $(document).ready(function() {
      $('*[data-image-bg]').each(function() {
        var imageBackgroundSrc = $(this).find('img').attr('src');
        $(this).find('img').removeAttr('src');
        $(this).css({
          backgroundImage: "url(" + imageBackgroundSrc + ")",
          backgroundSize: 'cover',
        });

        var backgroundPos = $(this).data('image-pos');
        if (backgroundPos !== undefined) {
          $(this).css('background-position', backgroundPos);
        }
        else {
          $(this).css('background-position', '50% 50%');
        }
      });
    });
  }

})(jQuery);

},{"./components/advertisement.js":1,"./components/dialog.js":2}]},{},[3]);
