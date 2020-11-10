(() => {
    // Declare a const and define it as a reference to all elements with a class 'slide in'.
    const sliders = document.querySelectorAll(".slide-in");
    /*
debounce() accepts a function as it's first parameter,
and will only call that function after N milliseconds have passed (where N is the second parameter).
*/
    const debounce = (func, wait = 20, immediate = true) => {
        let timeout;
        return (...args) => {
            const later = () => {
                timeout = null;
                if (!immediate) func.apply(this, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(this, args);
        };
    };

    // Declare a const, define it as an arrow function, and pass as arg to debounce:
    const checkSlide = debounce(() => {
        // Iterate through the const referencing the HTML Node elements with a class 'slide in':
        sliders.forEach((slider) => {
            // Declare & define four const variables as the point at which the image should be displayed:
            // The current scroll location in relation to the midway point of the image
            const slideInAt = window.scrollY + window.innerHeight - slider.height / 2,
                // The bottom of the image in relation to the entire page
                imgBottom = slider.offsetTop + slider.height,
                // Boolean value to decide if user has scrolled past the midway point of an image
                imgHalf = slideInAt > slider.offsetTop,
                // Boolean value to decide if the user has scrolled the image out of view
                inView = window.scrollY < imgBottom;
            /*
                        If the user has scrolled to a point where they are past the midway point of an image
                        and the image is still in view,
                        attach the 'active' class to the image.
                        Otherwise remove it.
                        */
            imgHalf && inView ?
                slider.classList.add("active") :
                slider.classList.remove("active");
        });
    });
    /*
                        Attach an event listener to the window object, 
                        listen for the 'scroll' event, 
                        and provide the previously declared const as the event handler.
                        */
    window.addEventListener("scroll", checkSlide);
})();