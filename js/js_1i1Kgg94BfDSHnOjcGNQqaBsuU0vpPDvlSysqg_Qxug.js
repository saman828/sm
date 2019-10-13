/**
 * @file label_trash.js
 * 
 * Takes parameters set on the configuration page and invokes floatlabel.js
 */
(function ($) {
  Drupal.behaviors.label_trash_attach = {

    attach: function(context, settings) {

      $(settings.label_trash, context).each(function() {

        // settings is an array of params indexed by selectors as entered on
        // the Label Trash config page. One selector string per decoration.
        $.each(this, function(selector, params) {
          
          $(selector).each(function(index, input) {
            var inputfield = $(input);
            var placeholder = inputfield.attr('placeholder');
            var label = null;
            // If the input element does not already have a placeholder,
            // create one based on its neighbouring label element.
            if (!placeholder) {
              // label = inputfield.prev('label');
              label = inputfield.siblings('label'); // [#2437401]
              if (label.length === 0) {
                // The targeted element may live inside a <div>.
                label = inputfield.parent().siblings('label');
              }
              placeholder = label.html();
            }
            if (!placeholder) {
              // If after all this we still have no placeholder, end like this:
              inputfield.attr('placeholder', Drupal.t('Type here'));
            }
            else {
              // Deal with placeholders containing HTML, like:
              // 'Title <span class="form-required" title="Field is required.">*</span>'
              var split = placeholder.indexOf('<');
              var placeholder_escaped = split < 0 ? placeholder : placeholder.substring(0, split) + $(placeholder.substring(split)).text();
              inputfield.attr('placeholder', placeholder_escaped);

              // Check whether the float flag is set.
              if (params['label-style']) {
                if (label) {
                  // Remove the label, floatlabel() will create a new one.
                  label.remove();
                }
                // Accessibility: as we're removing the label, let's make sure
                // to have at least an input field title.
                // See: http://www.html5accessibility.com/tests/placeholder-labelling.html
                if (!inputfield.attr('title')) {
                  inputfield.attr('title', placeholder_escaped);
                }

                inputfield.attr('data-label', placeholder);
                inputfield.floatlabel({
                  labelStartTop: params['floatlabel-offset-top-start'],
                  labelEndTop: params['floatlabel-offset-top-end'],
                  labelClass: params['label-css']['data-class'],
                  slideInput: params['slide-input'],
                  transitionDuration: params['transition-duration'],
                  transitionEasing: params['transition-easing']
                });
              }
              else if (label) {
                // Move rather than label.hide(), for accessibility.
                label.css('text-indent', -99999);
              }
            }           
          });
        });
      });
    }
  };
})(jQuery);
;
Drupal.locale = { 'pluralFormula': function ($n) { return Number(($n!=1)); }, 'strings': {"":{"An AJAX HTTP error occurred.":"\u06cc\u06a9 \u062e\u0637\u0627\u06cc AJAX HTTP \u0631\u062e \u062f\u0627\u062f\u0647 \u0627\u0633\u062a.","HTTP Result Code: !status":"\u06a9\u062f \u0646\u062a\u06cc\u062c\u0647 HTTP: !status","An AJAX HTTP request terminated abnormally.":"\u06cc\u06a9 \u062f\u0631\u062e\u0648\u0627\u0633\u062a AJAX HTTP \u0628\u0647 \u0635\u0648\u0631\u062a \u063a\u06cc\u0631\u0639\u0627\u062f\u06cc \u062e\u0627\u062a\u0645\u0647 \u06cc\u0627\u0641\u062a.","Debugging information follows.":"\u0627\u0637\u0644\u0627\u0639\u0627\u062a \u0627\u0634\u06a9\u0627\u0644\u200c\u0632\u062f\u0627\u06cc\u06cc \u062f\u0631 \u0627\u062f\u0627\u0645\u0647 \u0622\u0645\u062f\u0647 \u0627\u0633\u062a.","Path: !uri":"\u0645\u0633\u06cc\u0631: !uri","StatusText: !statusText":"\u0645\u062a\u0646 \u0648\u0636\u0639\u06cc\u062a: !statusText","ResponseText: !responseText":"\u0645\u062a\u0646 \u067e\u0627\u0633\u062e: !responseText","ReadyState: !readyState":"\u0648\u0636\u0639\u06cc\u062a \u0622\u0645\u0627\u062f\u06af\u06cc: !readyState","Configure":"\u067e\u06cc\u06a9\u0631\u0628\u0646\u062f\u06cc","Re-order rows by numerical weight instead of dragging.":"\u0628\u0627\u0632\u0622\u0631\u0627\u06cc\u06cc \u0633\u0637\u0631\u0647\u0627 \u0628\u0627 \u0648\u0632\u0646\u200c\u0647\u0627\u06cc \u0639\u062f\u062f\u06cc \u0628\u0647 \u062c\u0627\u06cc \u06a9\u0634\u06cc\u062f\u0646.","Show row weights":"\u0646\u0645\u0627\u06cc\u0634 \u0648\u0632\u0646 \u0633\u0637\u0631\u0647\u0627","Hide row weights":"\u0645\u062e\u0641\u06cc \u0646\u0645\u0648\u062f\u0646 \u0648\u0632\u0646 \u0633\u0637\u0631\u0647\u0627","Drag to re-order":"\u0628\u0631\u0627\u06cc \u0628\u0627\u0632\u0622\u0631\u0627\u06cc\u06cc \u0628\u06a9\u0634\u06cc\u062f","Changes made in this table will not be saved until the form is submitted.":"\u062a\u063a\u06cc\u06cc\u0631\u0627\u062a \u0627\u06cc\u062c\u0627\u062f \u0634\u062f\u0647 \u062f\u0631 \u0627\u06cc\u0646 \u062c\u062f\u0648\u0644 \u062a\u0627 \u0632\u0645\u0627\u0646\u06cc\u06a9\u0647 \u0641\u0631\u0645 \u0627\u0631\u0633\u0627\u0644 \u0646\u06af\u0631\u062f\u062f \u0630\u062e\u06cc\u0631\u0647 \u0646\u062e\u0648\u0627\u0647\u0646\u062f \u0634\u062f.","Hide":"\u067e\u0646\u0647\u0627\u0646 \u06a9\u0646","Show":"\u0646\u0645\u0627\u06cc\u0634","Select all rows in this table":"\u0627\u0646\u062a\u062e\u0627\u0628 \u0647\u0645\u0647 \u0633\u0637\u0631\u0647\u0627 \u062f\u0631 \u0627\u06cc\u0646 \u062c\u062f\u0648\u0644","Deselect all rows in this table":"\u0639\u062f\u0645 \u0627\u0646\u062a\u062e\u0627\u0628 \u0647\u0645\u0647 \u0633\u0637\u0631\u0647\u0627 \u062f\u0631 \u0627\u06cc\u0646 \u062c\u062f\u0648\u0644","Edit":"\u0648\u06cc\u0631\u0627\u06cc\u0634","Loading token browser...":"\u0628\u0627\u0631\u06af\u0630\u0627\u0631\u06cc \u0645\u0631\u0648\u0631 \u062a\u0648\u06a9\u0646...","Available tokens":"\u062a\u0648\u06a9\u0646\u200c\u0647\u0627\u06cc \u0645\u0648\u062c\u0648\u062f","(active tab)":"(\u0644\u0628\u0647 \u0641\u0639\u0627\u0644)","No style":"\u0628\u062f\u0648\u0646 \u0642\u0627\u0644\u0628","Disabled":"\u063a\u06cc\u0631\u0641\u0639\u0627\u0644","Enabled":"\u0641\u0639\u0627\u0644","Cancel":"\u0644\u063a\u0648","Save":"\u0630\u062e\u06cc\u0631\u0647","- None -":"- \u0647\u06cc\u0686\u06a9\u062f\u0627\u0645 -","Add":"\u0627\u0641\u0632\u0648\u062f\u0646","Not published":"\u0645\u0646\u062a\u0634\u0631 \u0646\u0634\u062f\u0647","Please wait...":"\u0644\u0637\u0641\u0627 \u0635\u0628\u0631 \u06a9\u0646\u06cc\u062f...","By @name on @date":"\u062a\u0648\u0633\u0637 @name \u062f\u0631 @date","By @name":"\u062a\u0648\u0633\u0637 @name","Alias: @alias":"\u0646\u0627\u0645 \u0645\u0633\u062a\u0639\u0627\u0631: @alias","No alias":"\u0628\u062f\u0648\u0646 \u0646\u0627\u0645 \u0645\u0633\u062a\u0639\u0627\u0631","New revision":"\u0628\u0627\u0632\u0628\u06cc\u0646\u06cc \u062c\u062f\u06cc\u062f","The changes to these blocks will not be saved until the \u003Cem\u003ESave blocks\u003C\/em\u003E button is clicked.":"\u062a\u0627 \u0632\u0645\u0627\u0646\u06cc\u06a9\u0647 \u0628\u0631\u0631\u0648\u06cc \u003Cem\u003E\u0630\u062e\u06cc\u0631\u0647 \u0628\u0644\u0648\u06a9\u003C\/em\u003E \u06a9\u0644\u06cc\u06a9 \u0646\u06a9\u0646\u06cc\u062f \u062a\u063a\u06cc\u06cc\u0631\u0627\u062a \u0630\u062e\u06cc\u0631\u0647 \u0646\u062e\u0648\u0627\u0647\u0646\u062f \u0634\u062f.","Region settings":"\u062a\u0646\u0638\u06cc\u0645\u0627\u062a \u0646\u0627\u062d\u06cc\u0647","This permission is inherited from the authenticated user role.":"\u0627\u06cc\u0646 \u0645\u062c\u0648\u0632 \u0627\u0632 \u0646\u0642\u0634 \u06a9\u0627\u0631\u0628\u0631 \u0634\u0646\u0627\u062e\u062a\u0647 \u0634\u062f\u0647 \u06af\u0631\u0641\u062a\u0647 \u0634\u062f\u0647 \u0627\u0633\u062a.","No revision":"\u0628\u062f\u0648\u0646 \u0628\u0627\u0632\u0628\u06cc\u0646\u06cc","@number comments per page":"@number \u062f\u06cc\u062f\u06af\u0627\u0647 \u062f\u0631 \u0647\u0631 \u0635\u0641\u062d\u0647","Requires a title":"\u0639\u0646\u0648\u0627\u0646 \u0627\u062c\u0628\u0627\u0631\u06cc \u0627\u0633\u062a","Not restricted":"\u0645\u062d\u062f\u0648\u062f \u0646\u0634\u062f\u0647","Not customizable":"\u063a\u06cc\u0631 \u0642\u0627\u0628\u0644 \u0633\u0641\u0627\u0631\u0634\u06cc \u0646\u0645\u0648\u062f\u0646","Restricted to certain pages":"\u0645\u062d\u062f\u0648\u062f \u06cc\u0647 \u0635\u0641\u062d\u0647\u200c\u0647\u0627\u06cc \u062e\u0627\u0635","The block cannot be placed in this region.":"\u0628\u0644\u0648\u06a9 \u0646\u0645\u06cc\u200c\u062a\u0648\u0627\u0646\u062f \u062f\u0631 \u0627\u06cc\u0646 \u0646\u0627\u062d\u06cc\u0647 \u0642\u0631\u0627\u0631 \u062f\u0627\u062f\u0647 \u0634\u0648\u062f.","Hide summary":"\u0645\u062e\u0641\u06cc \u0646\u0645\u0648\u062f\u0646 \u062e\u0644\u0627\u0635\u0647","Edit summary":"\u0648\u06cc\u0631\u0627\u06cc\u0634 \u062e\u0644\u0627\u0635\u0647","Don\u0027t display post information":"\u0627\u0637\u0644\u0627\u0639\u0627\u062a \u0645\u0637\u0644\u0628 \u0631\u0627 \u0646\u0634\u0627\u0646 \u0646\u062f\u0647","The selected file %filename cannot be uploaded. Only files with the following extensions are allowed: %extensions.":"\u0641\u0627\u06cc\u0644 \u0627\u0646\u062a\u062e\u0627\u0628 \u0634\u062f\u0647 %filename \u0646\u0645\u06cc\u200c\u062a\u0648\u0627\u0646\u062f \u0628\u0627\u0631\u06af\u0630\u0627\u0631\u06cc \u0634\u0648\u062f. \u0641\u0642\u0637 \u0641\u0627\u06cc\u0644\u200c\u0647\u0627\u06cc\u06cc \u0628\u0627 \u067e\u0633\u0648\u0646\u062f\u200c\u0647\u0627\u06cc \u0632\u06cc\u0631 \u0645\u062c\u0627\u0632 \u0647\u0633\u062a\u0646\u062f: %extensions.","Autocomplete popup":"\u0628\u0627\u0632\u0634\u0648\u0646\u062f\u0647 \u062a\u06a9\u0645\u06cc\u0644 \u062e\u0648\u062f\u06a9\u0627\u0631","Searching for matches...":"\u062c\u0633\u062a\u062c\u0648 \u0628\u0631\u0627\u06cc \u062a\u0637\u0627\u0628\u0642\u200c\u0647\u0627...","Other":"\u0633\u0627\u064a\u0631","Select all":"\u0627\u0646\u062a\u062e\u0627\u0628 \u0647\u0645\u0647","No name":"\u0628\u062f\u0648\u0646 \u0646\u0627\u0645","Remove group":"\u062d\u0630\u0641 \u06af\u0631\u0648\u0647","Apply (all displays)":"\u0627\u0639\u0645\u0627\u0644 (\u0647\u0645\u0647\u200c\u06cc \u0646\u0645\u0627\u06cc\u0634\u200c\u0647\u0627)","Apply (this display)":"\u0627\u0639\u0645\u0627\u0644 (\u0627\u06cc\u0646 \u0646\u0645\u0627\u06cc\u0634)","Submit":"\u062b\u0628\u062a","Downloads":"\u062f\u0627\u0646\u0644\u0648\u062f\u0647\u0627","required":"\u0636\u0631\u0648\u0631\u06cc"}} };;
(function ($) {

Drupal.googleanalytics = {};

$(document).ready(function() {

  // Attach mousedown, keyup, touchstart events to document only and catch
  // clicks on all elements.
  $(document.body).bind("mousedown keyup touchstart", function(event) {

    // Catch the closest surrounding link of a clicked element.
    $(event.target).closest("a,area").each(function() {

      // Is the clicked URL internal?
      if (Drupal.googleanalytics.isInternal(this.href)) {
        // Skip 'click' tracking, if custom tracking events are bound.
        if ($(this).is('.colorbox') && (Drupal.settings.googleanalytics.trackColorbox)) {
          // Do nothing here. The custom event will handle all tracking.
          //console.info("Click on .colorbox item has been detected.");
        }
        // Is download tracking activated and the file extension configured for download tracking?
        else if (Drupal.settings.googleanalytics.trackDownload && Drupal.googleanalytics.isDownload(this.href)) {
          // Download link clicked.
          ga("send", {
            "hitType": "event",
            "eventCategory": "Downloads",
            "eventAction": Drupal.googleanalytics.getDownloadExtension(this.href).toUpperCase(),
            "eventLabel": Drupal.googleanalytics.getPageUrl(this.href),
            "transport": "beacon"
          });
        }
        else if (Drupal.googleanalytics.isInternalSpecial(this.href)) {
          // Keep the internal URL for Google Analytics website overlay intact.
          ga("send", {
            "hitType": "pageview",
            "page": Drupal.googleanalytics.getPageUrl(this.href),
            "transport": "beacon"
          });
        }
      }
      else {
        if (Drupal.settings.googleanalytics.trackMailto && $(this).is("a[href^='mailto:'],area[href^='mailto:']")) {
          // Mailto link clicked.
          ga("send", {
            "hitType": "event",
            "eventCategory": "Mails",
            "eventAction": "Click",
            "eventLabel": this.href.substring(7),
            "transport": "beacon"
          });
        }
        else if (Drupal.settings.googleanalytics.trackOutbound && this.href.match(/^\w+:\/\//i)) {
          if (Drupal.settings.googleanalytics.trackDomainMode !== 2 || (Drupal.settings.googleanalytics.trackDomainMode === 2 && !Drupal.googleanalytics.isCrossDomain(this.hostname, Drupal.settings.googleanalytics.trackCrossDomains))) {
            // External link clicked / No top-level cross domain clicked.
            ga("send", {
              "hitType": "event",
              "eventCategory": "Outbound links",
              "eventAction": "Click",
              "eventLabel": this.href,
              "transport": "beacon"
            });
          }
        }
      }
    });
  });

  // Track hash changes as unique pageviews, if this option has been enabled.
  if (Drupal.settings.googleanalytics.trackUrlFragments) {
    window.onhashchange = function() {
      ga("send", {
        "hitType": "pageview",
        "page": location.pathname + location.search + location.hash
      });
    };
  }

  // Colorbox: This event triggers when the transition has completed and the
  // newly loaded content has been revealed.
  if (Drupal.settings.googleanalytics.trackColorbox) {
    $(document).bind("cbox_complete", function () {
      var href = $.colorbox.element().attr("href");
      if (href) {
        ga("send", {
          "hitType": "pageview",
          "page": Drupal.googleanalytics.getPageUrl(href)
        });
      }
    });
  }

});

/**
 * Check whether the hostname is part of the cross domains or not.
 *
 * @param string hostname
 *   The hostname of the clicked URL.
 * @param array crossDomains
 *   All cross domain hostnames as JS array.
 *
 * @return boolean
 */
Drupal.googleanalytics.isCrossDomain = function (hostname, crossDomains) {
  /**
   * jQuery < 1.6.3 bug: $.inArray crushes IE6 and Chrome if second argument is
   * `null` or `undefined`, http://bugs.jquery.com/ticket/10076,
   * https://github.com/jquery/jquery/commit/a839af034db2bd934e4d4fa6758a3fed8de74174
   *
   * @todo: Remove/Refactor in D8
   */
  if (!crossDomains) {
    return false;
  }
  else {
    return $.inArray(hostname, crossDomains) > -1 ? true : false;
  }
};

/**
 * Check whether this is a download URL or not.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isDownload = function (url) {
  var isDownload = new RegExp("\\.(" + Drupal.settings.googleanalytics.trackDownloadExtensions + ")([\?#].*)?$", "i");
  return isDownload.test(url);
};

/**
 * Check whether this is an absolute internal URL or not.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isInternal = function (url) {
  var isInternal = new RegExp("^(https?):\/\/" + window.location.host, "i");
  return isInternal.test(url);
};

/**
 * Check whether this is a special URL or not.
 *
 * URL types:
 *  - gotwo.module /go/* links.
 *
 * @param string url
 *   The web url to check.
 *
 * @return boolean
 */
Drupal.googleanalytics.isInternalSpecial = function (url) {
  var isInternalSpecial = new RegExp("(\/go\/.*)$", "i");
  return isInternalSpecial.test(url);
};

/**
 * Extract the relative internal URL from an absolute internal URL.
 *
 * Examples:
 * - http://mydomain.com/node/1 -> /node/1
 * - http://example.com/foo/bar -> http://example.com/foo/bar
 *
 * @param string url
 *   The web url to check.
 *
 * @return string
 *   Internal website URL
 */
Drupal.googleanalytics.getPageUrl = function (url) {
  var extractInternalUrl = new RegExp("^(https?):\/\/" + window.location.host, "i");
  return url.replace(extractInternalUrl, '');
};

/**
 * Extract the download file extension from the URL.
 *
 * @param string url
 *   The web url to check.
 *
 * @return string
 *   The file extension of the passed url. e.g. "zip", "txt"
 */
Drupal.googleanalytics.getDownloadExtension = function (url) {
  var extractDownloadextension = new RegExp("\\.(" + Drupal.settings.googleanalytics.trackDownloadExtensions + ")([\?#].*)?$", "i");
  var extension = extractDownloadextension.exec(url);
  return (extension === null) ? '' : extension[1];
};

})(jQuery);
;