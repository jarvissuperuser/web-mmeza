import {DOMElement,doc} from '../core/index.js';

export class AppLoader extends DOMElement{
    static get is() { return 'app-loader';}
    HTMLTemplate() {
        return `
<div class="w3-modal p-0 w3-show bg-blur">
    <div class="w3-modal-content bg-none vh-100">
        <div class=" w3-grid place-center vh-100">
            <div class="w3-center">
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">
                <rect x="0" y="13" width="4" height="5" fill="#f55">
                  <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
                  <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0s" dur="0.6s" repeatCount="indefinite"></animate>
                </rect>
                <rect x="10" y="13" width="4" height="5" fill="#f55">
                  <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
                  <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.15s" dur="0.6s" repeatCount="indefinite"></animate>
                </rect>
                <rect x="20" y="13" width="4" height="5" fill="#f55">
                  <animate attributeName="height" attributeType="XML" values="5;21;5" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
                  <animate attributeName="y" attributeType="XML" values="13; 5; 13" begin="0.3s" dur="0.6s" repeatCount="indefinite"></animate>
                </rect>
                </svg>
                <p class="w3-text-light-gray">Loading ...</p>
            </div>

        </div>
    </div>
</div>
        `;
    }
    loadTargetElements() {
        this._state = true;
        this.imgCounter = 0;
        this.modal = this.getElements('div.w3-modal')[0];
        this.resource  = new PerformanceObserver(o => {
            o.getEntriesByType('resource').forEach(e => {
                if (e.initiatorType === 'img') {
                    this.imgCounter++;
                    clearTimeout(this.timer);
                    this.showing = true;
                    this.newTimer();
                }
            });
        });
        this.textContainer = this.getElements('p')[0];
    }
    timeCb() {
        if (this.imgCounter >= 0) {
            this.showing = false;
            this.updateState();
            clearTimeout(this.timer);
        }
    }
    newTimer() {
        this.showing = true;
        this.timer =  setTimeout(this.timeCb.bind(this),700);
    }
    attachAttributesNLogic() {
        doc.onreadystatechange = () => {
            switch (doc.readyState) {
            case 'loading':
                this.textContainer.innerText = 'loading';
                break;
            case 'interactive':
                this.textContainer.innerText = 'Finalizing';
                break;
            case 'complete':
                this.newTimer();
                this.resource.observe({entryTypes: ['resource']});

            }
        };
    }

    updateState() {
        if (this.showing) {
            this.modal.classList.add('w3-show');
        } else {
            this.modal.classList.remove('w3-show');
        }
    }
    closeState() {
        this._state = false;
        this.updateState();
    }
    set showing(state) {
        this._state = state;
        this.updateState();
    }
    get showing() {
        return this._state?this._state:false;
    }
}
