import {addEl} from '../abstraction.js';
import {ImageCanvas} from '../../shared";
import {ModelBase, modelMixIn} from './model-base.js';


export const modalMixIn = Base => class extends Base {
    HTMLTemplate() {
        return `
<div class="w3-modal ">
    <div class="w3-modal-content w3-card w3-animate-zoom">
        <h4 class="w3-center"><span class="modalTitle">${this.modalTitle}</span> <button class="w3-btn w3-red w3-right close">&times;</button></h4>
        <div class="w3-col s12 l6 m6"> 
            <div class="canvas"></div>
        </div>
    </div>
</div>        
        `;
    }
    loadStyle(styleFile = './styles.css') {
        super.loadStyle(styleFile);
        const styles = `
        .close {
            padding: 0 8px !important;
        }
        `;
        this.setStyles(styles);
    }
    /**
     * @property {ImageCanvas}imageCanvas
     * */
    loadTargetElements() {
        this.modal = this.getElements('.w3-modal')[0];
        this.canvasContain = this.getElements('.canvas')[0];
        this.imageCanvas = addEl(ImageCanvas.is);
        this.modalTitleElement = this.getElements('span.modalTitle')[0];
        this.close = this.getElements('.close')[0];
        this.button = this.getElements('button.add')[0];
        this.closed = new CustomEvent('closed');
        this._model = this.model;
    }

    attachAttributesNLogic() {
        this.imageCanvas.addEventListener('changes', event => {
            this._model.image = event.target.src;
        });
        this.close.onclick = () => this.closeState();

    }
    addUpdateButton() {
        this.button.innerText = this.buttonText;
        this.button.onclick = () => {
            this.processData();
            this.dispatchEvent(this.closed);
            this.closeState();
        };
        this.updateState();
    }
    processData() {}
    attachCanvas(width = 950, height = 1424, maxHeight = 675) {
        this.imageCanvas.width = width;
        this.imageCanvas.height = height;
        this.imageCanvas.maxCanvasHeight = maxHeight;
        this.canvasContain.appendChild(this.imageCanvas);
        this.imageCanvas.addEventListener('changes', event => {
            this._model.image = event.target.src;
            if (this.img) {
                this.img.src = event.target.src;
            }
        });
    }
    /**
     * @deprecated
     * moving to more efficient binding
     * */
    inputLoader() {
        const {inputs} = this;
        if (inputs) {
            inputs.forEach(input =>
                input.addEventListener('blur', () => {
                    this._model[input.getAttribute('name')] = input.value;
                    const display = this.getElements(`span.${input.getAttribute('name')}`)[0];
                    if (display) display.innerText = input.value;
                }));
        }
    }
    updateState() {
        if (this.showing) {
            this.modal.classList.add('w3-show');
        } else {
            this.modal.classList.remove('w3-show');
        }
    };
    closeState() {
        this._state = false;
        this.updateState();
    }
    set showing(state) {
        this._state = state;
        this.loadData();
        this.updateState();
    }
    get showing() {
        return !!this._state?this._state:false;
    }
    loadData(){};
    get buttonText() {
        return this._buttonText ? this._buttonText : 'Add To Shop';
    }
    set buttonText(text) {
        this._buttonText = text;
    }
    get modalTitle() {
        return  this._modalTitle?this._modalTitle: 'Add Item to Shop';
    }
    set modalTitle(title) {
        this._modalTitle = title;
        if (this.modalTitleElement) this.modalTitleElement.innerText = title ;
    }
}


/**
 * @class ModalBase
 * @public
 *
 * */
export class ModalBase extends modalMixIn(ModelBase) {

}
