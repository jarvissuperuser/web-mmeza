import {
    DOMElement,win,
    modalMixIn, modelMixIn,
        uuid, addEl, declareMessageBus
    } from '../../core/index.js';
import {ShopItemModel} from '../../data/models/shop-item-model.js';

class ImgWrap {
    constructor() {
        this.blob = null;
        this.index = -1;
        this.changed = false;
        this.src = '';
        this.shopItemId = '';
        this.imgName = '';
    }
}

export class AppModal extends modelMixIn(modalMixIn(DOMElement)) {
    static get is() {
        return 'app-modal';
    }
    HTML() {
        return `
<div class="w3-modal ">
    <div class="w3-modal-content w3-card w3-animate-zoom">
        <div name="content" class="w3-container bg-theme">
            <h3 class="w3-center"><span class="modalTitle">${this.modalTitle}</span> <button class="w3-btn w3-red w3-right close">&times;</button></h3>
            <form class="w3-col s12 l4 m12">
                <div class="w3-col s12">Editor|preview
                    <div class="w3-col s12"><span class="w3-btn w3-teal p-1 save-img">Save</span><span class="w3-text-red w3-right w3-btn p-1 clear-img">&times;</span></div>
                </div>
                <div class="canvas"> </div>
                
            </form>
            <div class="w3-col s12 l2 m12 vh-25 w3-hide-small w3-container">
                <div class="w3-padding w3-center">
                    <img src="assets/img/MiniPlus.jpg" alt="" class="w3-image i-0">
                </div>
                <div class="w3-padding w3-center">
                    <img src="assets/img/MiniPlus.jpg" alt="" class="w3-image i-1">
                </div>
                <div class="w3-padding w3-center">
                    <img src="assets/img/MiniPlus.jpg" alt="" class="w3-image i-2">
                </div>

            </div>

            <div class="w3-col s12 w3-hide-large w3-hide-medium">
                <div class="w3-padding w3-col s4">
                    <img src="assets/img/MiniPlus.jpg" alt="" class="w3-image i-0">
                </div>
                <div class="w3-padding w3-col s4">
                    <img src="assets/img/MiniPlus.jpg" alt="" class="w3-image i-1">
                </div>
                <div class="w3-padding w3-col s4">
                    <img src="assets/img/MiniPlus.jpg" alt="" class="w3-image i-2">
                </div>
            </div>

            <div class="w3-col s12 l6 m12 w3-padding">
                <div class="w3-card-2 w3-round w3-hide">
                    <img  alt="Item Name" class="w3-image w3-round w3-round-top">
                    <div class="c-body w3-padding">
                        <div class="w3-row"><span class="w3-text-large title"></span> <span class="w3-right price">Item Price</span></div> 
                        <div class="w3-row"><button class="w3-button w3-white w3-right w3-disabled" disabled>+ Add To Cart</button></div>
                    </div>
                </div>
                <div class="bg-theme">
                    <app-input class="w3-col s6" label=" Car Make" name="title" ></app-input>
                    <app-input class="w3-col s6" label=" Car Model" name="model" ></app-input>
                    <app-input class="w3-col s6" label=" Car Year" name="year" ></app-input>
                    <app-input class="w3-col s6" label=" Price" name="price" ></app-input>
                    <app-input class="w3-col s12" label=" Item Description" name="description" ></app-input>
                    <div class="w3-col s12 m8"> 
                    <div class="w3-padding w3-col s6">
                        <a class="w3-btn w3-purple w3-text-small opt colorOptions">+ Color</a>
                    </div>
                    <div class="w3-padding w3-col s6">
                        <a class="w3-btn w3-pink w3-text-small opt sizeOptions">+ Detail</a>
                    </div>
                    </div>
                    <div class="w3-padding w3-col s12 m4">
                        <app-toggle></app-toggle>
                    </div>
                    <div class="w3-row">
                        <div class="w3-col s12 w3-padding"><app-option class="sizeOptions"></app-option></div>
                        <div class="w3-col s12 w3-padding"><app-option class="colorOptions"></app-option></div> 
                    </div>
                </div>
                <div class="w3-col s12">
                <div class="w3-col s5">
                    <button class="w3-button w3-teal add">+ Add To Catalog</button>
                </div>
                <div class="w3-col s4">
                    <button class="w3-button w3-deep-orange disable">Disable</button>
                </div>
                <div class="w3-col s3">
                    <button class="w3-button w3-teal w3-deep-purple">Delete</button>
                </div>
                </div>
            </div>
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

    loadTargetElements() {
        super.loadTargetElements();
        this.model = this.model ?? new ShopItemModel();
        this.keys = Object.keys(this.model);
        this.modal = this.getElements('.w3-modal')[0];
        this.imageCanvas = addEl('image-canvas');
        this.img = this.getElements('img')[0];
        this.imgs = this.getElements('img');
        this.titleElement = this.getElements('span.title')[0];
        this.priceElement = this.getElements('span.price')[0];
        this.optionButtons = this.getElements('a.opt');
        this.options = this.getElements('app-option');
        this.inventoryToggle = this.byId('app-toggle');
        this.modalTitleElement = this.getElements('span.modalTitle')[0];
        this.inputs = this.getElements('app-input');
        this.clearImg = this.getElements('.clear-img')[0];
        this.saveImg = this.getElements('.save-img')[0];
        this.close = this.getElements('.close')[0];
        this.button = this.getElements('button.add')[0];
        this.closed = new CustomEvent('closed');
        this._model = this.model;
        this.imgWraps = [];
    }
    attachAttributesNLogic() {
        this.attachCanvas();
        this.inputs.forEach(input =>
            input.addEventListener('blur', () => {
                this.model[input.getAttribute('name')] = input.value;
                const display = this.getElements(`span.${input.getAttribute('name')}`)[0];
                if ( display) display.innerText = input.value;
            }));
        this.updateState();
        this.close.onclick = () => this.closeState();
        this.button.innerText = this.buttonText;
        this.inventoryToggle.onText = 'In Stock';
        this.inventoryToggle.offText = 'Sold';
        Array.from(this.imgs).forEach(img => {
            img.onclick = () => {
                Array.from(this.imgs).forEach(i => i.classList.remove('w3-border'));
                this.imageCanvas.reset();
                let idx = -1;
                if (img.classList.contains('i-0')) {
                    this.selectImgs =  Array.from(this.imgs).filter(i => i.classList.contains('i-0'));
                    idx = 0;
                }
                if (img.classList.contains('i-1')) {
                    this.selectImgs =  Array.from(this.imgs).filter(i => i.classList.contains('i-1'));
                    idx = 1;
                }
                if (img.classList.contains('i-2')) {
                    this.selectImgs =  Array.from(this.imgs).filter(i => i.classList.contains('i-2'));
                    idx = 2;
                }
                let imgWrap = this.imgWraps.filter(i => i.index === idx)[0];
                imgWrap = imgWrap ? imgWrap : new ImgWrap();
                imgWrap.index = idx;
                this.imgWraps[idx] = imgWrap;
                this.selectImg = imgWrap;
                this.selectImgs.forEach(i => i.classList.add('b-1','w3-border','w3-border-blue'));
            }
        });
        const getImgs = (idx) => {
            return Array.from(this.imgs).filter(img => img.classList.contains(`i-${idx}`));
        }
        if (this.model.images.length) {
            this.model.images.forEach(async (img, idx) => {
                const imgWrap = new ImgWrap();
                imgWrap.src = img;
                imgWrap.index = idx;
                imgWrap.imgName = img.split('/')[1];
                imgWrap.shopItemId = this.model.id;
                imgWrap.blob = await win.crud().blobGet(img);
                getImgs(idx).forEach(i => this.imageDisplay(i,imgWrap.blob));
                this.imgWraps.push(imgWrap);
            });
        }
        this.clearImg.onclick = () => {
            if(this.selectImgs) this.selectImgs.filter(x => x.src = 'assets/img/MiniPlus.jpg'); 
        }
        this.button.onclick = () => {
            this.processData();
            this.dispatchEvent(this.closed);
            this.closeState();
        };
        this.attachOptions();
    }

    hasCanvas(canvasContainer) {
        return Array.from(canvasContainer.children).some(cc => cc.tagName === 'IMAGE-CANVAS');
        // console.log({boolRes});
         // return boolRes;
    }
    attachCanvas(width = 512, height = 512) {
        this.imageCanvas.width = width;
        this.imageCanvas.height = height;
        if (!this.hasCanvas(this.canvasContain)){
        this.canvasContain.appendChild(this.imageCanvas);
        this.imageCanvas.addEventListener('changes', async _ => {
            // this.model.image = event.target.src;
            // console.log({def:this.imageCanvas.isDefault});
            if (!this.imageCanvas.isDefault) {
                if (this.selectImgs){    
                    this.selectImg.blob = await this.imageCanvas.blob;
                    this.selectImg.shopItemId = this.model.id;
                    this.selectImg.imgName = `${this.model.id}-img-${this.selectImg.index}.jpg`;
                    this.selectImg.changed = true;
                    this.imgWraps[this.selectImg.index] = this.selectImg; 
                    this.selectImgs.forEach(img => this.imageDisplay(img, this.selectImg.blob));
                }
            }
        });
        }
    }
    imageDisplay(img,blob) {
        const url = URL.createObjectURL(blob);
        img.onload = () =>{
            URL.revokeObjectURL(blob); 
        }
        img.src = url;
    }
    attachOptions() {
        Array.from(this.optionButtons).forEach(btn => {
           btn.onclick = btn.classList.contains('sizeOptions') ?
               () => {
                   const option = this.getOption('sizeOptions')
                   option.model.placeholder = '+ detail';
                   option.addItem()
               } :
               () => {
                   const option = this.getOption('colorOptions')
                   option.model.placeholder = '+ color'
                   option.addItem()
               }
        });
        this.options.forEach(o => o.empty());
        Array.from(this.options).forEach(op => {
            if (op.classList.contains('sizeOptions'))
                this.model.sizeOptions.forEach(opt => op.addItem(opt))
            else {
                this.model.colorOptions.forEach(opt => op.addItem(opt));
            }
        })
    }
    putOptionsToModel() {
        this.model.colorOptions = this.getOption().model.items
        this.model.sizeOptions = this.getOption('sizeOptions').model.items
    }

    /**
     * @returns AppOption
     * */
    getOption(cls = 'colorOptions') {
        return Array.from(this.options).filter(o => o.classList.contains(cls))[0]
    }
    mkMessage(msg =  '') {
        declareMessageBus({
            type: 'info',
            header: 'Alert',
            message: msg
        });
    }
    processData() {
        const filterInputs = (key) => {
            return Array.from(this.inputs)
                .filter(input => input.getAttribute('name') === (key))[0]
        }
        for(const target of this.keys) {
            const input = filterInputs(target);
            if (input) this._model[target] = input.value;
        }
        this.putOptionsToModel();
        this.model.image = this.imageCanvas.src;
        this.model.inventoryAvailable = this.inventoryToggle.checked? 1:0;
        if (!this.model.id) this.model.id = uuid();
        if(!this.model.dateAdded) this.model.dateAdded = Date.now();
    }
    loadData() {
        const filterInputs = (key) => {
            return Array.from(this.inputs)
                .filter(input => input.getAttribute('name') === (key))[0]
        }
        for(const target of this.keys) {
            const input = filterInputs(target);
            if (input) input.value = this.model[target];
        }
        this.inventoryToggle.checked = this.model.inventoryAvailable === 1;
        this.titleElement.innerText = this._model.title;
        this.priceElement.innerText = this._model.price;
        //if (this.model.image) this.imageCanvas.src = this.model.image;
        //if (!this.model.image) this.imageCanvas.src = this.imageCanvas.rawImg;
    }
    // @ overrides
    set showing(state) {
        this._state = state;
        if (!this.model.id) this.model.id = uuid();
        //if(!this.model.image) this.imageCanvas.src = this.imageCanvas.rawImg;
        this.loadData();
        this.updateState();
    }
    get showing() {
        return !!this._state?this._state:false;
    }
    get buttonText() {
        return this._buttonText ? this._buttonText : 'Add To Shop';
    }
    set buttonText(text) {
        this._buttonText = text;
        this.attachAttributesNLogic();
    }
}
