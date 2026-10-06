jQuery(document).ready(function($) {
	"use strict";
	// formname is set inline by the form partials (hubform, contactform, etc).
	// Pages without a form don't define it, so skip wiring up validation there.
	if (typeof formname === 'undefined') {
		return;
	}
	// A select option can carry data-allow='{"field": ["value", ...]}', which
	// limits the choices in those fields while it is selected, such as a
	// system that is only offered as a VM. A field whose current choice is no
	// longer allowed moves to its first allowed one. Limits apply in form
	// order, so an earlier choice can clear a later one that would limit it
	// back, such as POWER10 clearing an addon that is bare metal only.
	function applyLimits(form) {
		var limited = {};
		$(form).find('option[data-allow]').each(function() {
			$.each(JSON.parse($(this).attr('data-allow')), function(name) {
				limited[name] = true;
			});
		});
		$.each(limited, function(name) {
			$(form).find('select[name="' + name + '"] option').prop('disabled', false);
		});
		$(form).find('select').each(function() {
			var allow = $(this).find('option:selected').attr('data-allow');
			if (allow === undefined) {
				return;
			}
			$.each(JSON.parse(allow), function(name, values) {
				if (!values) {
					return;
				}
				var select = $(form).find('select[name="' + name + '"]');
				select.find('option').each(function() {
					if ($.inArray(this.value, values) === -1) {
						$(this).prop('disabled', true);
					}
				});
				if (select.find('option:selected').prop('disabled')) {
					select.val(select.find('option:not(:disabled)').first().val());
				}
			});
		});
	}
	// Blocks marked data-show-if="field" data-show-match="regexp" are shown
	// only while that field's value matches. Hidden blocks have their fields
	// disabled, so they are neither validated nor sent. A block inside a
	// hidden block, or one whose field is itself disabled, stays hidden.
	function syncConditional(form) {
		applyLimits(form);
		$(form).find('[data-show-if]').each(function() {
			var block = $(this);
			var field = $(form).find('[name="' + block.attr('data-show-if') + '"]');
			var match = new RegExp(block.attr('data-show-match'), 'i');
			// A radio or checkbox group matches on its checked values
			var value = field.is(':radio, :checkbox') ?
				field.filter(':checked').map(function() { return this.value; }).get().join(' ') :
				field.val();
			var show = field.length > 0 && !field.prop('disabled') &&
				match.test(value || '') &&
				block.parents('[data-show-if]').filter(function() {
					return this.style.display === 'none';
				}).length === 0;
			block.toggle(show);
			block.find('input, select, textarea').prop('disabled', !show);
			if (!show) {
				block.find('.validation').html('').hide();
			}
		});
	}
	$(formname).each(function() {
		var form = this;
		syncConditional(form);
		$(form).on('change', 'input, select, textarea', function() {
			syncConditional(form);
		});
	});
	// Browsers restore field values when coming back to a cached page, so
	// resync then too.
	$(window).on('pageshow', function() {
		$(formname).each(function() {
			syncConditional(this);
		});
	});
	$(formname).submit(function() {
		var f = $(this).find('.form-group'),
		ferror = false,
		emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;
		f.children('input').each(function() {
			var i = $(this);
			var rule = i.prop('disabled') ? undefined : i.attr('data-rule');
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
			var rule = i.prop('disabled') ? undefined : i.attr('data-rule');
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
		f.children('select').each(function() {
			var i = $(this);
			if (i.prop('disabled') || i.attr('data-rule') !== 'required') {
				return;
			}
			var ierror = i.val() === '' || i.val() === null;
			if (ierror) {
				ferror = true;
			}
			i.next('.validation').html(ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'Please choose an option') : '').show('blind');
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
		// Require the Turnstile challenge to be completed before submitting.
		// The widget writes its token into a hidden cf-turnstile-response input
		// inside this form, so an empty value means it has not finished.
		if ($(this).find('.cf-turnstile').length && !$(this).find('[name="cf-turnstile-response"]').val()) {
			$("#sendmessage").removeClass("show").hide();
			$("#errormessage").html("Please complete the challenge before submitting.").addClass("show").show();
			return false;
		}
		// Valid: allow the normal POST to formsender. formsender validates the
		// submission server-side and 302-redirects to forms.redirect on success,
		// or back to that page with ?error=&message= on failure.
		return true;
	});
});
