jQuery(document).ready(function($) {
	"use strict";
	$(formname).submit(function() {
		var f = $(this).find('.form-group'),
		ferror = false,
		emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;
		f.children('input').each(function() {
			var i = $(this);
			var rule = i.attr('data-rule');
			if (rule !== undefined) {
				var ierror = false;
				var pos = rule.indexOf(':', 0);
				if (pos >= 0) {
					var exp = rule.substr(pos + 1, rule.length);
					rule = rule.substr(0, pos);
				} else {
					rule = rule.substr(pos + 1, rule.length);
				}
				switch (rule) {
					case 'required':
						if (i.val() === '') {
							ferror = ierror = true;
						}
						break;
					case 'minlen':
						if (i.val().length < parseInt(exp)) {
							ferror = ierror = true;
						}
						break;
					case 'email':
						if (!emailExp.test(i.val())) {
							ferror = ierror = true;
						}
						break;
					case 'checked':
						if (!i.attr('checked')) {
							ferror = ierror = true;
						}
						break;
					case 'regexp':
						exp = new RegExp(exp);
						if (!exp.test(i.val())) {
							ferror = ierror = true;
						}
						break;
				}
				i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
			}
		});
		f.children('textarea').each(function() {
			var i = $(this);
			var rule = i.attr('data-rule');
			if (rule !== undefined) {
				var ierror = false;
				var pos = rule.indexOf(':', 0);
				if (pos >= 0) {
					var exp = rule.substr(pos + 1, rule.length);
					rule = rule.substr(0, pos);
				} else {
					rule = rule.substr(pos + 1, rule.length);
				}
				switch (rule) {
					case 'required':
						if (i.val() === '') {
							ferror = ierror = true;
						}
						break;
					case 'minlen':
						if (i.val().length < parseInt(exp)) {
							ferror = ierror = true;
						}
						break;
				}
				i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
			}
		});
		if (ferror) {
			return false;
		}
		// Require the reCAPTCHA challenge to be completed before submitting.
		if (typeof grecaptcha !== 'undefined' && grecaptcha.getResponse() === '') {
			$("#sendmessage").removeClass("show").hide();
			$("#errormessage").html("Please complete the reCAPTCHA challenge before submitting.").addClass("show").show();
			return false;
		}
		// Valid: allow the normal POST to formsender. formsender validates the
		// submission server-side and 302-redirects to forms.redirect on success,
		// or back to that page with ?error=&message= on failure.
		return true;
	});
});
