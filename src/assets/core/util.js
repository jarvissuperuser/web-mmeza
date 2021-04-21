// import {addEl} from './abstraction.js';

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

export const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
