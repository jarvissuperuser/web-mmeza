import {DOMElement, imgShow, win} from '../core/index.js';

export class ShopImg extends DOMElement {
    static get is() { return 'shop-img'}

    HTML() {
        return `<div class="w3-content">
    <div class="shim"></div>
    <img src="assets/img/placeholder.svg" alt="" class="w3-image w3-round w3-round-top w3-hide">
<img src="" alt="" class="w3-image w3-round w3-round-top w3-hide">
<img src="" alt="" class="w3-image w3-round w3-round-top w3-hide">
</div>`;
    }

    loadTargetElements() {
        this.imgs = this.getElements('img.w3-image');
    }

    attachAttributesNLogic() {
        // this.loadPlaceholders();
        this.loadImages(this.images);
    }
    loadPlaceholders() {
        if(this.imgs){
            this.imgs.forEach((img) => img.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" width="400.91953" height="400.10971" viewBox="0 0 400.91953 400.10971" version="1.1" id="svg1"><defs id="defs1"><linearGradient id="fill"><stop offset="5%" stop-color="#d4d4d4" stop-opacity="1"><animate attributeName="offset" values="-20%; -20%; 50%" keyTimes="0; 0.25; 1" dur="2s" repeatCount="indefinite"/></stop><stop offset="30%" stop-color="#ecebeb" stop-opacity="1"><animate attributeName="offset" values="-10%; 20%; 75%" keyTimes="0; 0.25; 1" dur="2s" repeatCount="indefinite"/></stop><stop offset="75%" stop-color="#d4d4d4" stop-opacity="1"><animate attributeName="offset" values="0; 3; 0;" keyTimes="0; 0.25; 1" dur="2s" repeatCount="indefinite"/></stop></linearGradient></defs><g id="layer1" style="stroke:none" transform="translate(0.41257024,0.02194523)"><rect style="fill:url(#fill)" id="rect1" width="400.91953" height="400.10971" x="-0.41257024" y="-0.021945225"/></g></svg>`);
        }
    }


    loadImages(value = []) {
        if (this.imgs && this.imgs.length) {
            value.forEach(async (i, idx) => {
                if  (idx < 3) {
                    imgShow(this.imgs[idx], await win.crud().blobGet(i), () => { this.byId('.shim').classList.add('w3-hide'); this.imgs[0].classList.remove('w3-hide')});
                } 
            });
        }
    }
    /**
     *  
     * */
    set images(value = []){
        console.assert(value.constructor.name === 'Array');
        this._images = value;
        this.loadImages(value);
    }

    /**
     * @returns {string[]}
     * */
    get images() {
        return this._images;
    }
}
