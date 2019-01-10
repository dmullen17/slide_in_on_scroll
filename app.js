const sliderImages = document.querySelectorAll('.slide-in');

// Debounce function
// Returns a function, that, as long as it continues to be invoked, will not be triggered. The function will be called after it stops being called for N milliseconds. If `immediate` is passed, trigger the function on the leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

// Create a function that runs every time the person scrolls 
function checkSlide(e) {
    // console.log(e);
    //console.count(e); //runs ~50 times per full scroll - too much!
    //console.log(window.scrollY);
    sliderImages.forEach(sliderImage => {
        // console.log(`Image Y property: ${sliderImage.y}`);
        const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height/2;
        console.log(slideInAt); // current Y position at top + window inner height gives us Y position at bottom of window
        const imageBottom = sliderImage.offsetTop + sliderImage.height;
        console.log(`imageBottom: ${imageBottom}`);
        const isHalfShown = slideInAt > sliderImage.offsetTop;
        console.log(`sliderImage.offsetTop: ${sliderImage.offsetTop}`);
        const isNotScrolledPast = window.scrollY < imageBottom;
        
        if (isHalfShown && isNotScrolledPast) {
            sliderImage.classList.add('active');
        } else {
            sliderImage.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', debounce(checkSlide, 200));