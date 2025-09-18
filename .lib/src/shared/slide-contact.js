import {  AnimatedSlide } from "./animated.js";

export class SlideContact extends AnimatedSlide {
    static get is() {
        return 'slide-contact';
    }
    HTML() {
        return /* HTML */`<div class="w3-col s12 vh-100 bg-theme w3-grid">
    <div class="w3-col s12 vh-20 w3-grid place-center"><h1 class="bg-g1 tx-bg">Contact us</h1></div>
<div class="w3-col s12 vh-50">
	<div class="w3-content">
		<div class="w3-col m4 s12 w3-padding">
            <h3>Find us on our socials</h3>
            <div> Contact us through the official channels we have listed below, we are looking forward to hearing from you </div>
        </div>
		<div class="w3-col m4 s12 w3-padding">
            <h3>Find us on our socials</h3>
            <div> Contact us through the official channels we have listed below, we are looking forward to hearing from you </div>
        </div>
		<div class="w3-col m4 s12 w3-padding">
            <h3>Find us on our socials</h3>
            <div> Contact us through the official channels we have listed below, we are looking forward to hearing from you </div>
        </div>
	</div>
</div>	
</div>`;
    }
    loadTargetElements() {
    }
    async attachAttributesNLogic() {
        this.applyIntersectionObserver();
        // Add any additional logic or event listeners here
    }
}
