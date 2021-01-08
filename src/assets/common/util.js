import {addEl} from "./abstraction.js";

export function * delay(duration = 3000) {
    return new Promise((resolve) =>{
        setTimeout(()=>{
            resolve();
        },duration)
    });
}

export function hideSlides(slides) {
    slides.forEach(slide => {slide.classList.add('w3-hide')});
}
export function * log (obj) {
    yield console.log(obj);
}

export async function * sliderAnimation(slides, animationClass, pauseDuration) {
    let counter = 0;
    slides.forEach(slide => {slide.classList.add(animationClass)});
    while (true) {
        hideSlides(slides);
        slides[counter % slides.length].classList.remove('w3-hide');
        counter++;
        yield* delay(pauseDuration);
    }
}

