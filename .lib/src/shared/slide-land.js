import { AnimatedSlide } from './animated.js';

export class SlideLand extends AnimatedSlide{
    static get is() {return `slide-land`};
    HTML() {
    return `<div class="w3-col s12 vh-100 bg-theme w3-grid">
    <div class="w3-col s12 vh-50 w3-grid place-center "><h1 class="w3-container"><img src="/assets/img/cw_stat_icon.png" class="box-48"> <span class="w3-animate-opacity bg-g6 tx-bg">Connect</span></h1></div>
    <div class="w3-col s12 vh-50">
        <div class="w3-col s12 m6">
            <div class="w3-col s12 vh-20 w3-animate-top">
                <div class="w3-padding w3-col s6 h-100"> <a href="#app" class="w3-col s12 w3-round-large w3-padding h-100 bg-g4 cntnr"><span class="w3-display-bottomleft w3-padding bold">Apps</span> <img src="assets/img/mobile-app-svgrepo-com.svg" class="w3-image h-90 w3-right"> </a></div>
                <div class="w3-padding w3-col s6 h-100"> <a href="#web" class="w3-col s12 w3-round-large w3-padding h-100 bg-g5 cntnr"><span class="w3-display-bottomleft w3-padding bold">Web</span><img src="assets/img/availability-svgrepo-com.svg" class="w3-image h-90 w3-right"></a> </div>
            </div>
            <div class="w3-col s12 vh-25">
                <div class="w3-col s12 w3-padding w3-animate-left">
                    <a href="#about" class="w3-round-large w3-padding h-100 bg-g4 cntnr w3-block"> <span class="w3-display-bottomleft w3-padding bold"> About </span><img src="assets/img/cloud-acceleration-svgrepo-com.svg" class="w3-image h-90 w3-right"> </a>
                </div>
            </div>
        </div>
        <div class="w3-col s6">
            <div class="w3-padding w3-col s12 w3-hide-small">
                <a href="#contact"class="w3-col s12 w3-round-large w3-padding h-90 bg-g3 cntnr w3-animate-right"><span class="w3-display-bottomleft w3-padding bold"> Contact </span><img src="assets/img/contact-247.svg" class="w3-image h-50 w3-right"> </a>
            </div>
        </div>
    </div>
</div>`;
    }

    loadTargetElements() {
    }

    attachAttributesNLogic() {
        this.applyIntersectionObserver();
    }
}
