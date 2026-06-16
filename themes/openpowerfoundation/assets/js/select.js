'use strict';
var inputField = document.querySelector('.member-value');
var dropdown = document.querySelector('.member-list');
// Only the member-filtered forms (e.g. ISA RFC, Passport) render these
// elements. Bail out on pages without them so we don't dereference null.
if (inputField && dropdown) {
var dropdownArray = [].concat(document.querySelectorAll('li'));
var dropdownItems = dropdownArray[0];
var valueArray = [];
dropdownItems.forEach(function (item) {
	valueArray.push(item.textContent);
});
var closeDropdown = function closeDropdown() {
	dropdown.classList.remove('open');
};
inputField.addEventListener('input', function () {
	dropdown.classList.add('open');
	var inputValue = inputField.value.toLowerCase();
	var valueSubstring = undefined;
	if (inputValue.length > 0) {
		for (var j = 0; j < valueArray.length; j++) {
			if (!(inputValue.substring(0, inputValue.length) === valueArray[j].substring(0, inputValue.length).toLowerCase())) {
				dropdownItems[j].classList.add('closed');
			} else {
				dropdownItems[j].classList.remove('closed');
			}
		}
	} else {
		for (var i = 0; i < dropdownItems.length; i++) {
			dropdownItems[i].classList.remove('closed');
		}
	}
});
dropdownItems.forEach(function (item) {
	item.addEventListener('click', function (evt) {
		inputField.value = item.textContent;
		dropdownItems.forEach(function (dropdown) {
			dropdown.classList.add('closed');
		});
	});
});
inputField.addEventListener('focus', function () {
	inputField.placeholder = 'Type to filter';
	dropdown.classList.add('open');
	dropdownItems.forEach(function (dropdown) {
		dropdown.classList.remove('closed');
	});
});
inputField.addEventListener('blur', function () {
	inputField.placeholder = 'Select Member Entity';
	dropdown.classList.remove('open');
});
document.addEventListener('click', function (evt) {
	var isDropdown = dropdown.contains(evt.target);
	var isInput = inputField.contains(evt.target);
	if (!isDropdown && !isInput) {
		dropdown.classList.remove('open');
	}
});
}
