import { AnimatedSlide } from './animated.js';


export class SlideCloud extends AnimatedSlide {
    static get is() { return `slide-cloud` };
    HTML() {
        return `<div class="w3-col s12 vh-100 bg-theme w3-grid">
        <div class="w3-hide">Services</div>
        <div class="w3-col s12 vh-100">
        <div class="w3-content vh-100 w3-grid place-center">
            <div class="w3-col s12 vh-80 w3-text-white">
            <div class="w3-col s12">
                <div class="w3-col s12 m4">
                <div class="w3-col s12 w3-padding">
                    <div class="w3-col s12 h-60 w3-padding w3-round-large cover bg-g6 w3-animate-left"><div class="w3-padding pkt w3-display-bottomleft">
                    <div class="w3-padding pdg w3-round-large">
                        <p>Be part of a community of bible centric believers connecting in Johannesburg to worship, share, and grow together in faith.</p>
                        <h5 class="bold">Connect</h5>
                    </div>
                    </div></div>
                </div>
                <div class="w3-col s12 w3-padding">
                    <div class="w3-col s12 h-30 w3-padding w3-round-large cover bg-g1 w3-animate-left"><div class="w3-padding pkt w3-display-bottomleft">
                    <div class="w3-padding pdg w3-round-large">
                        <p>Commune with the holy spirit, parttaking on indepth bible studies</p>
                        <h5 class="bold">Commune</h5>
                    </div>
                    </div></div>
                </div>
                </div>
                <div class="w3-col m8 w3-hide-small w3-padding">
                <div class="w3-col s12 h-30 bg-g3 w3-padding w3-round-large cover w3-animate-top"><div class="w3-padding pkt w3-display-bottomleft">
                    <div class="w3-padding pdg w3-round-large">
                    <p>Testify of God's goodness and grace and get encouraged.</p>
                    <h5 class="bold">Testify</h5>
                    </div>
                </div></div>
                </div>
                <div class="w3-col m4 w3-hide-small w3-padding">
                <div class="w3-col s12 h-60 bg-g4 w3-padding w3-round-large cover w3-animate-top"><div class="w3-padding pkt w3-display-bottomleft">
                    <div class="w3-padding pdg w3-round-large">
                    <p>Volunteer and serve being part of the community spreading the good news of Christ's resurrection.</p>
                    <h5 class="bold">Serve</h5>
                    </div>
                </div></div>
                </div>
                <div class="w3-col m4 w3-hide-small h-60">
                <div class="w3-col s12 w3-padding">
                    <div class="w3-col s12 h-30 bg-g5 w3-padding w3-round-large cover w3-animate-right"><div class="w3-padding pkt w3-display-bottomleft">
                    <div class="w3-padding pdg w3-round-large">
                        <p>Join in prayer and intercession meetings weekly as you grow spiritually</p>
                        <h5 class="bold">Interceed</h5>
                    </div>
                    </div></div>
                </div>
                <div class="w3-col s12 w3-hide-small w3-padding">
                    <div class="w3-col s12 h-60 bg-g2 w3-padding w3-round-large cover w3-animate-right"><div class="w3-padding pkt w3-display-bottomleft">
                    <div class="w3-padding pdg w3-round-large">
                        <p>Join us in powerful praise and worship every meeting, immersed in the holy ghost.</p>
                        <h5 class="bold">Worship</h5>
                    </div>
                    </div></div>
                </div>
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
