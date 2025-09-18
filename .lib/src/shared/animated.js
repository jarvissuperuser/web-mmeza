import { DOMElement } from "../core/index.js";

export const animated = Base => class extends Base {

    applyIntersectionObserver(){

        const cs = ['.w3-animate-opacity', '.w3-animate-top', '.w3-animate-bottom', '.w3-animate-right', '.w3-animate-left'];
        this.targets = [];
        this.cls = [];
        for(const cls of cs){
            this.targets.push(... Array.from(this.getElements(cls)))
        }
        const observer = (cls) => {
            return new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (!entry.target.classList.contains(cls)) entry.target.classList.add(cls);
                    }
                    if (!entry.isIntersecting) {
                        entry.target.classList.remove(cls);
                    }
                })
            }, {threshold: 0.05})
        }
        this.targets.forEach((t,i) => {
            for(const cls of cs) {
                if (t.classList.contains(cls.replace('.',''))){
                    this.cls.push(cls);
                }
            }
            observer(this.cls[i].replace('.', '')).observe(t)
        });
        
    }
}

export class AnimatedSlide extends animated(DOMElement) {
}
