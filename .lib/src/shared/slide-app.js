import { AnimatedSlide } from './animated.js';


export class SlideApp extends AnimatedSlide{
    static get is() {return `slide-app`};
    HTML() {
    return `<div class="w3-col s12 vh-100 bg-theme w3-grid">
    <div class="w3-col s12 vh-20 w3-grid place-center"><h1 class="bg-g1 tx-bg">Apps & Web</h1></div>
    <div class="w3-col s12 vh-75">
        <div class="w3-content">
            <div class="w3-col s12">
                <div class="w3-col s12">
                    <div class="w3-col s6 m4 w3-padding ">
                        <a href="" target="__blank" class="w3-col s12 w3-border w3-border-dark-grey cntnr w3-round-large cntnr w3-rest w3-animate-top"><div class="pkt w3-padding w3-display-bottomleft"><div class="w3-padding bg-blur w3-round-large"><h4 class="bold w3-hide-small">Launch</h3><p> The launch screen of the app.</p></div></div> <img src="assets/img/Screenshot_1755346456.png" alt="accounts" class="w3-image"></a>
                    </div>
                    <div class="w3-col s6 m4 w3-padding">
                        <a href="" class="w3-col s12  w3-border w3-border-dark-grey cntnr w3-round-large cntnr w3-rest w3-animate-top"><div class="pkt w3-padding w3-display-bottomleft"><div class="w3-padding bg-blur w3-round-large"><h4 class="bold w3-hide-small">Notifications</h3><p>Get the latest notications from the app</p></div></div><img src="assets/img/Screenshot_1755346483.png" alt="accounts" class="w3-image"></a>
                    </div>
                    <div class="w3-col s6 m4 w3-padding">
                        <a href="" target="__blank" class="w3-col s12  w3-border w3-border-dark-grey cntnr w3-round-large cntnr w3-rest w3-animate-right"> <div class="pkt w3-padding w3-display-bottomleft"><div class="w3-padding bg-blur w3-round-large"><h4 class="bold w3-hide-small">Events</h3><p>Follow church events</p></div></div><img src="assets/img/Screenshot_1755346492.png" alt="accounts" class="w3-image"></a>
                    </div>
                </div>
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
