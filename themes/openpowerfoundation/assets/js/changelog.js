(function() {
// Only run on pages that actually render a changelog timeline.
if (!document.querySelector(".changelog ol")) {
	return;
}
const changelog = document.querySelector(".changelog ol"),
elH = document.querySelectorAll(".changelog li > div"),
arrows = document.querySelectorAll(".changelog .arrows .arrow"),
arrowPrev = document.querySelector(".changelog .arrows .arrow__prev"),
arrowNext = document.querySelector(".changelog .arrows .arrow__next"),
firstItem = document.querySelector(".changelog li:first-child"),
lastItem = document.querySelector(".changelog li:last-child"),
xScrolling = 280,
disabledClass = "disabled";
window.addEventListener("load", init);
function init() {
	setEqualHeights(elH);
	animateTl(xScrolling, arrows, changelog);
	setSwipeFn(changelog, arrowPrev, arrowNext);
	setKeyboardFn(arrowPrev, arrowNext);
}
function setEqualHeights(el) {
	let counter = 0;
	for (let i = 0; i < el.length; i++) {
		const singleHeight = el[i].offsetHeight;
		if (counter < singleHeight) {
			counter = singleHeight;
		}
	}
	for (let i = 0; i < el.length; i++) {
		el[i].style.height = `${counter}px`;
	}
}
function isElementInViewport(el) {
	const rect = el.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}
function setBtnState(el, flag = true) {
	if (flag) {
		el.classList.add(disabledClass);
	} else {
		if (el.classList.contains(disabledClass)) {
			el.classList.remove(disabledClass);
		}
		el.disabled = false;
	}
}
function animateTl(scrolling, el, tl) {
	let counter = 0;
	for (let i = 0; i < el.length; i++) {
		el[i].addEventListener("click", function() {
			if (!arrowPrev.disabled) {
				arrowPrev.disabled = true;
			}
			if (!arrowNext.disabled) {
				arrowNext.disabled = true;
			}
			const sign = (this.classList.contains("arrow__prev")) ? "" : "-";
			if (counter === 0) {
				tl.style.transform = `translateX(-${scrolling}px)`;
			} else {
				const tlStyle = getComputedStyle(tl);
				const tlTransform = tlStyle.getPropertyValue("-webkit-transform") || tlStyle.getPropertyValue("transform");
				const values = parseInt(tlTransform.split(",")[4]) + parseInt(`${sign}${scrolling}`);
				tl.style.transform = `translateX(${values}px)`;
			}
			setTimeout(() => {
				isElementInViewport(firstItem) ? setBtnState(arrowPrev) : setBtnState(arrowPrev, false);
				isElementInViewport(lastItem) ? setBtnState(arrowNext) : setBtnState(arrowNext, false);
			}, 1100);
			counter++;
		});
	}
}
function setSwipeFn(tl, prev, next) {
	// Hammer is an optional touch-gesture dependency; skip swipe support if it
	// isn't loaded rather than throwing a ReferenceError.
	if (typeof Hammer === 'undefined') {
		return;
	}
	const hammer = new Hammer(tl);
	hammer.on("swipeleft", () => next.click());
	hammer.on("swiperight", () => prev.click());
}
function setKeyboardFn(prev, next) {
	document.addEventListener("keydown", (e) => {
		if ((e.which === 37) || (e.which === 39)) {
			const changelogOfTop = changelog.offsetTop;
			const y = window.pageYOffset;
			if (changelogOfTop !== y) {
				window.scrollTo(0, changelogOfTop);
			}
			if (e.which === 37) {
				prev.click();
			} else if (e.which === 39) {
				next.click();
			}
		}
	});
}
})();
