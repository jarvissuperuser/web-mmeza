import {addEl} from "./abstraction.js";

export function * delay(duration = 3000) {
    return new Promise((resolve) =>{
        setTimeout(()=>{
            resolve();
        },duration)
    });
}

export function hideSlides(slides) {
    slides.forEach(slide => {slide.classList.add('w3-hide')})
}

export async function * sliderAnimation(slides, animationClass, pauseDuration) {
    let counter = 0;
    while (true) {
        hideSlides(slides)
        slides[counter%slides.length].classList.remove('w3-hide');
        yield* delay(pauseDuration);
    }
}

