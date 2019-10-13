!function(t,a,i,e){function s(a,i){this.$element=t(a),this.settings=t.extend({},n,i),this.init()}var l="floatlabel",n={slideInput:!0,labelStartTop:"20px",labelEndTop:"10px",transitionDuration:.3,transitionEasing:"ease-in-out",labelClass:"",typeMatches:/text|password|email|number|search|url/};s.prototype={init:function(){var t=this,i=this.settings,e=i.transitionDuration,s=i.transitionEasing,l=this.$element,n={"-webkit-transition":"all "+e+"s "+s,"-moz-transition":"all "+e+"s "+s,"-o-transition":"all "+e+"s "+s,"-ms-transition":"all "+e+"s "+s,transition:"all "+e+"s "+s},o=l.attr("id");o||(o=Math.floor(100*Math.random())+1,l.attr("id",o));var p=l.attr("placeholder"),c=l.data("label"),r=l.data("class");r||(r=""),p&&""!==p||(p="You forgot to add placeholder attribute!"),c&&""!==c||(c=p),this.inputPaddingTop=parseFloat(l.css("padding-top")),l.wrap('<div class="floatlabel-wrapper" style="position:relative"></div>'),l.before('<label for="'+o+'" class="label-floatlabel '+i.labelClass+" "+r+'">'+c+"</label>"),this.$label=l.prev("label"),this.$label.css({position:"absolute",top:i.labelStartTop,right:l.css("padding-right"),display:"none","-moz-opacity":"0","-khtml-opacity":"0","-webkit-opacity":"0",opacity:"0"}),i.slideInput||l.css({"padding-top":this.inputPaddingTop}),l.bind("keyup blur change",function(a){t.checkValue(a)}),a.setTimeout(function(){t.$label.css(n),t.$element.css(n)},100),this.checkValue()},checkValue:function(t){if(t){var a=t.keyCode||t.which;if(9===a)return}var i=this.$element,e=i.data("flout");""!==i.val()&&i.data("flout","1"),""===i.val()&&i.data("flout","0"),"1"===i.data("flout")&&"1"!==e&&this.showLabel(),"0"===i.data("flout")&&"0"!==e&&this.hideLabel()},showLabel:function(){var t=this;t.$label.css({display:"block"}),a.setTimeout(function(){t.$label.css({top:t.settings.labelEndTop,"-moz-opacity":"1","-khtml-opacity":"1","-webkit-opacity":"1",opacity:"1"}),t.settings.slideInput&&t.$element.css({"padding-top":t.inputPaddingTop})},50)},hideLabel:function(){var t=this;t.$label.css({top:t.settings.labelStartTop,"-moz-opacity":"0","-khtml-opacity":"0","-webkit-opacity":"0",opacity:"0"}),t.settings.slideInput&&t.$element.css({"padding-top":parseFloat(t.inputPaddingTop)-10}),a.setTimeout(function(){t.$label.css({display:"none"})},1e3*t.settings.transitionDuration)}},t.fn[l]=function(a){return this.each(function(){t.data(this,"plugin_"+l)||t.data(this,"plugin_"+l,new s(this,a))})}}(jQuery,window,document);;
// Persian Wordifier
// Version: 1.0
// Author: Salman Arab Ameri
// Publish: 2014-03-11
// with use of ideas in http://www.dotnettips.info/post/626/%D8%AA%D8%A8%D8%AF%DB%8C%D9%84-%D8%B9%D8%AF%D8%AF-%D8%A8%D9%87-%D8%AD%D8%B1%D9%88%D9%81

var wordifyfa = function (num, level) {
	'use strict';
    if (num === null) {
        return "";
	}
	// convert negative number to positive and get wordify value
	if (num<0) {
		num = num * -1;
		return "منفی " + wordifyfa(num, level); 
	}
    if (num === 0) {
        if (level === 0) {
            return "صفر";
		} else {
            return "";
		}
	}
	var result = "",
		yekan = [" یک ", " دو ", " سه ", " چهار ", " پنج ", " شش ", " هفت ", " هشت ", " نه "],
		dahgan = [" بیست ", " سی ", " چهل ", " پنجاه ", " شصت ", " هفتاد ", " هشتاد ", " نود "],
		sadgan = [" یکصد ", " دویست ", " سیصد ", " چهارصد ", " پانصد ", " ششصد ", " هفتصد ", " هشتصد ", " نهصد "],
		dah = [" ده ", " یازده ", " دوازده ", " سیزده ", " چهارده ", " پانزده ", " شانزده ", " هفده ", " هیجده ", " نوزده "];
    if (level > 0) {
        result += " و ";
        level -= 1;
    }
   
    if (num < 10) {
        result += yekan[num - 1];
    } else if (num < 20) {
        result += dah[num - 10];
    } else if (num < 100) {
        result += dahgan[parseInt(num / 10, 10) - 2] +  wordifyfa(num % 10, level + 1);
    } else if (num < 1000) {
        result += sadgan[parseInt(num / 100, 10) - 1] + wordifyfa(num % 100, level + 1);
    } else if (num < 1000000) {
        result += wordifyfa(parseInt(num / 1000, 10), level) + " هزار " + wordifyfa(num % 1000, level + 1);
    } else if (num < 1000000000) {
        result += wordifyfa(parseInt(num / 1000000, 10), level) + " میلیون " + wordifyfa(num % 1000000, level + 1);
    } else if (num < 1000000000000) {
        result += wordifyfa(parseInt(num / 1000000000, 10), level) + " میلیارد " + wordifyfa(num % 1000000000, level + 1);
    } else if (num < 1000000000000000) {
        result += wordifyfa(parseInt(num / 1000000000000, 10), level) + " تریلیارد " + wordifyfa(num % 1000000000000, level + 1);
    }
	return result;

};

var wordifyRials = function (num) {
	'use strict';
    return wordifyfa(num, 0) + " ریال";
};

var wordifyRialsInTomans = function (num) {
	'use strict';
    if (num >= 10) {
        num = parseInt(num / 10, 10);
    } else if (num<=-10) {
        num = parseInt(num/10,10);
    } else {
		num=0;
	}
	
    return wordifyfa(num, 0) + " تومان";
};

if (typeof module !== 'undefined' && module.exports) {
	module.exports.wordifyfa = wordifyfa;
	module.exports.wordifyRials = wordifyRials;
	module.exports.wordifyRialsInTomans = wordifyRialsInTomans;
}

;
(function($) {
  Drupal.behaviors.idpayProcessBlock = {
    attach: function(context) {
      //
      var Plugins;
      (function(n){var t=function(){function n(n){typeof n=="undefined"&&(n=30);this.space=n}return n}(),i;n.AutosizeInputOptions=t;i=function(){function n(t,i){var r=this;this._input=$(t);this._options=$.extend({},n.getDefaultOptions(),i);this._mirror=$('<span style="position:absolute; top:-999px; left:0; white-space:pre;"/>');$.each(["fontFamily","fontSize","fontWeight","fontStyle","letterSpacing","textTransform","wordSpacing","textIndent"],function(n,t){r._mirror[0].style[t]=r._input.css(t)});$("body").append(this._mirror);this._input.on("keydown keyup input propertychange change",function(){r.update()});(function(){r.update()})()}return n.prototype.getOptions=function(){return this._options},n.prototype.update=function(){var n=this._input.val()||"",t;n!==this._mirror.text()&&(this._mirror.text(n),t=this._mirror.width()+this._options.space,this._input.width(t))},n.getDefaultOptions=function(){return this._defaultOptions},n.getInstanceKey=function(){return"autosizeInputInstance"},n._defaultOptions=new t,n}();n.AutosizeInput=i,function(t){var i="autosize-input",r=["text","password","search","url","tel","email","number"];t.fn.autosizeInput=function(u){return this.each(function(){if(this.tagName=="INPUT"&&t.inArray(this.type,r)>-1){var f=t(this);f.data(n.AutosizeInput.getInstanceKey())||(u==undefined&&(u=f.data(i)),f.data(n.AutosizeInput.getInstanceKey(),new n.AutosizeInput(this,u)))}})};t(function(){t("input[data-"+i+"]").autosizeInput()})}(jQuery)})(Plugins||(Plugins={}))

      $('input#edit-amount').autosizeInput();
      var amountValue = $('input#edit-amount').data('price');


      if ($('html').hasClass("no-touch")) {
         $('.node-gateway input.form-text:enabled:first').focus();
      }

      $('#idpay-process-block-form .form-item-amount .description').hide();

      jQuery('#idpay-process-block-form .form-item-amount').click(function() {
        $(this).find('input').focus();
      });

      jQuery('#idpay-process-block-form #edit-phone').on('propertychange change paste input', function () {
        $(this).num_to_en();
      });

      if ($('#idpay-process-block-form #edit-amount').is(':disabled') || $('#idpay-process-block-form #edit-amount').val()) {

        var tomans = wordifyRialsInTomans(numeral($('#idpay-process-block-form #edit-amount').val()));
        var amount_desc = $('#idpay-process-block-form .form-item-amount .description');
        $(amount_desc).html(tomans);

        if ($(amount_desc).height() > 24) {
          $(amount_desc).css('top', '-45px');
        }
        else {
          $(amount_desc).css('top', '-26px');
        }

        if (tomans == 'صفر تومان') {
          $(amount_desc).hide();
        }
        else {
          $(amount_desc).show();
        }

        $('#idpay-process-block-form #edit-amount').val(function () {
          $(this).attr('value', numeral($(this).val()).format('0,0'));
          return numeral($(this).val()).format('0,0');
        });
      }

      $('#idpay-process-block-form #edit-amount').on('propertychange change keyup paste input', function () {
        $(this).num_to_en();
        var amount = $(this).val();
        var amount_unformat = numeral(amount).value();
        var tomans = wordifyRialsInTomans(amount_unformat);
        var amount_format = numeral($(this).val()).format('0,0');

        $(this).val(amount_format);

        var amount_desc = $(this).parents('.form-item').find('.description');

        $(amount_desc).html(tomans);

        if ($(amount_desc).height() > 24) {
          $(amount_desc).css('top', '-45px');
        }
        else {
          $(amount_desc).css('top', '-26px');
        }

        if (tomans == 'صفر تومان') {
          $(amount_desc).hide();
        }
        else {
          $(amount_desc).show();
        }
      });


      $('#idpay-process-block-form #edit-count').on('propertychange change keyup paste input', function () {

        $(this).num_to_en();

        var count = $.isNumeric($(this).val()) ? $(this).val() : 1;
        var amount = $('input#edit-amount').attr('data-price') * count;

        $('input#edit-amount').val(amount).change();
      });

    }
  }
})(jQuery);
;
/**
 * @file
 * A JavaScript file for the theme.
 * This file should be used as a template for your other js files.
 * It defines a drupal behavior the "Drupal way".
 *
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth

(function ($, Drupal, window, document, undefined) {
  'use strict';

  // To understand behaviors, see https://drupal.org/node/756722#behaviors
  Drupal.behaviors.hideSubmitBlockit = {
    attach: function(context) {
      var timeoutId = null;
      $('form', context).once('hideSubmitButton', function () {
        var $form = $(this);

        // Bind to input elements.
        if (Drupal.settings.hide_submit.hide_submit_method === 'indicator') {
          // Replace input elements with buttons.
          $('input.form-submit', $form).each(function(index, el) {
            var attrs = {};

            $.each($(this)[0].attributes, function(idx, attr) {
                attrs[attr.nodeName] = attr.nodeValue;
            });

            $(this).replaceWith(function() {
                return $("<button/>", attrs).append($(this).attr('value'));
            });
          });
          // Add needed attributes to the submit buttons.
          $('button.form-submit', $form).each(function(index, el) {
            $(this).addClass('ladda-button button').attr({
              'data-style': Drupal.settings.hide_submit.hide_submit_indicator_style,
              'data-spinner-color': Drupal.settings.hide_submit.hide_submit_spinner_color,
              'data-spinner-lines': Drupal.settings.hide_submit.hide_submit_spinner_lines
            });
          });
          Ladda.bind('.ladda-button', $form, {
            timeout: Drupal.settings.hide_submit.hide_submit_reset_time
          });
        }
        else {
          $('input.form-submit, button.form-submit', $form).click(function (e) {
            var el = $(this);
            el.after('<input type="hidden" name="' + el.attr('name') + '" value="' + el.attr('value') + '" />');
            return true;
          });
        }

        // Bind to form submit.
        $('form', context).submit(function (e) {
          var $inp;
          if (!e.isPropagationStopped()) {
            if (Drupal.settings.hide_submit.hide_submit_method === 'disable') {
              $('input.form-submit, button.form-submit', $form).attr('disabled', 'disabled').each(function (i) {
                var $button = $(this);
                if (Drupal.settings.hide_submit.hide_submit_css) {
                  $button.addClass(Drupal.settings.hide_submit.hide_submit_css);
                }
                if (Drupal.settings.hide_submit.hide_submit_abtext) {
                  $button.val($button.val() + ' ' + Drupal.settings.hide_submit.hide_submit_abtext);
                }
                $inp = $button;
              });

              if ($inp && Drupal.settings.hide_submit.hide_submit_atext) {
                $inp.after('<span class="hide-submit-text">' + Drupal.checkPlain(Drupal.settings.hide_submit.hide_submit_atext) + '</span>');
              }
            }
            else if (Drupal.settings.hide_submit.hide_submit_method !== 'indicator'){
              var pdiv = '<div class="hide-submit-text' + (Drupal.settings.hide_submit.hide_submit_hide_css ? ' ' + Drupal.checkPlain(Drupal.settings.hide_submit.hide_submit_hide_css) + '"' : '') + '>' + Drupal.checkPlain(Drupal.settings.hide_submit.hide_submit_hide_text) + '</div>';
              if (Drupal.settings.hide_submit.hide_submit_hide_fx) {
                $('input.form-submit, button.form-submit', $form).addClass(Drupal.settings.hide_submit.hide_submit_css).fadeOut(100).eq(0).after(pdiv);
                $('input.form-submit, button.form-submit', $form).next().fadeIn(100);
              }
              else {
                $('input.form-submit, button.form-submit', $form).addClass(Drupal.settings.hide_submit.hide_submit_css).hide().eq(0).after(pdiv);
              }
            }
            // Add a timeout to reset the buttons (if needed).
            if (Drupal.settings.hide_submit.hide_submit_reset_time) {
              timeoutId = window.setTimeout(function() {
                hideSubmitResetButtons(null, $form);
              }, Drupal.settings.hide_submit.hide_submit_reset_time);
            }
          }
          return true;
        });
      });

      // Bind to clientsideValidationFormHasErrors to support clientside validation.
      // $(document).bind('clientsideValidationFormHasErrors', function(event, form) {
        //hideSubmitResetButtons(event, form.form);
      // });

      // Reset all buttons.
      function hideSubmitResetButtons(event, form) {
        // Clear timer.
        window.clearTimeout(timeoutId);
        timeoutId = null;
        switch (Drupal.settings.hide_submit.hide_submit_method) {
          case 'disable':
            $('input.' + Drupal.checkPlain(Drupal.settings.hide_submit.hide_submit_css) + ', button.' + Drupal.checkPlain(Drupal.settings.hide_submit.hide_submit_css), form)
              .each(function (i, el) {
                $(el).removeClass(Drupal.checkPlain(Drupal.settings.hide_submit.hide_submit_hide_css))
                  .removeAttr('disabled');
              });
            $('.hide-submit-text', form).remove();
            break;

          case 'indicator':
            Ladda.stopAll();
            break;

          default:
            $('input.' + Drupal.checkPlain(Drupal.settings.hide_submit.hide_submit_css) + ', button.' + Drupal.checkPlain(Drupal.settings.hide_submit.hide_submit_css), form)
              .each(function (i, el) {
                $(el).stop()
                  .removeClass(Drupal.checkPlain(Drupal.settings.hide_submit.hide_submit_hide_css))
                  .show();
              });
            $('.hide-submit-text', form).remove();
        }
      }
    }
  };

})(jQuery, Drupal, window, this.document);
;
