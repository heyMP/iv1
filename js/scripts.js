var advertisement = require('./components/advertisement.js');
var dialog = require('./components/dialog.js');

(function ($) {
  'use strict';

  // navigation
  if (typeof Drupal != 'undefined') {
    Drupal.behaviors.vide = {
      attach: function (context, settings) {
        $(".button-collapse").sideNav();
      }
    };
  }
  else {
    $(document).ready(function() {
      $(".button-collapse").sideNav();
    });
  }

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
