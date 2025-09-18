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

export const replacer = (c) => {
  const clamp = 36;  
  let d = Date.now();
  let d2 = new Date(d + ((Math.random() * 12345)% 300)).getTime();
  let r = Math.random() * clamp;//random number between 0 and 16
  if(d > 0){//Use timestamp until depleted
    r = (d + r)%clamp | 0;
    d = Math.floor(d/clamp);
  } else {//Use microseconds since page-load if supported
    r = (d2 + r)%clamp | 0;
    d2 = Math.floor(d2/clamp);
  }
    let i = c ==='x' || !(r%7) || !(r%5) || !(r%3)
  return i?(r).toString(clamp):r.toString(clamp).toUpperCase();
}

export const cuid = () => {
    return 'xxyxx'.replace(/[xy]/g, replacer);
}

export const currencyFormatter = (amount,locale = 'en-ZA', currency = 'ZAR') => {
    const format = new Intl.NumberFormat(locale,
        {style: 'currency', currency: currency})
    return format.format(amount)
}

export function imageDisplay(img,blob) {
        const url = URL.createObjectURL(blob);
        img.onload = () =>{
            URL.revokeObjectURL(blob); 
        }
        img.src = url;
}

export const imgShow = (img,blob, al = _ => null) => {
        const url = URL.createObjectURL(blob);
        img.onload = () =>{
            URL.revokeObjectURL(blob);
            al();
        }
        img.src = url;
}
