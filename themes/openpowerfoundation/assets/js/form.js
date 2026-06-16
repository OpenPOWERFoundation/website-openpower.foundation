jQuery(document).ready(function($) {
	"use strict";
	// formname is set inline by the form partials (hubform, contactform, etc).
	// Pages without a form don't define it, so skip wiring up validation there.
	if (typeof formname === 'undefined') {
		return;
	}
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
		// formsender requires a single `name` field for the ticket requestor.
		// Forms that collect the name as separate firstname/lastname inputs
		// (e.g. the passport form) have no `name` field of their own, so build
		// one from those parts before the POST.
		if ($(this).find('[name="name"]').length === 0) {
			var firstName = $.trim($(this).find('[name="firstname"]').val() || '');
			var lastName = $.trim($(this).find('[name="lastname"]').val() || '');
			var fullName = $.trim(firstName + ' ' + lastName);
			if (fullName !== '') {
				$('<input>').attr({type: 'hidden', name: 'name', value: fullName}).appendTo(this);
			}
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
