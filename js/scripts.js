var viewportUnitsRepaint = require('./viewportUnitsRepaint.js');
var advertisement = require('./components/advertisement.js');

(function ($) {
  'use strict';

  objectFit.polyfill({
      selector: 'img', // this can be any CSS selector
      fittype: 'cover', // either contain, cover, fill or none
      disableCrossDomain: 'true' // either 'true' or 'false' to not parse external CSS files.
  });

  // MenuToggle
  if (typeof Drupal != 'undefined') {
    Drupal.behaviors.repaintSlickbanner = {
      attach: function (context, settings) {
        viewportUnitsRepaint($('.slickheader__title'));
      }
    };
  }
  else {
    $(document).ready(function() {
      viewportUnitsRepaint($('.slickheader__title'));
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
          $(this).vide('../video/' + videSrc);
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
        $(this).vide('../video/' + videSrc);
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

  // Dialog
  if (typeof Drupal != 'undefined') {
    Drupal.behaviors.dialog = {
      attach: function (context, settings) {
      }
    };
  }
  else {
    $(document).ready(function() {
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
    });
  }

})(jQuery);
