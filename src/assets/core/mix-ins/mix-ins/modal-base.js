import {addEl} from '../abstraction.js';
import  {Core}  from '../core.js';
import { ImageBase } from '../mix-ins/image-base.js';
import {ModelBase, modelMixIn} from './model-base.js';


export class ImageCanvas extends ImageBase(Core) {
    static get is() {
        return 'image-canvas';
    }
    static get observedAttributes() {
        return ['src', 'image','width', 'height', 'maxCanvasHeight', 'maxCanvasWidth']
    }
    attributeChangedCallback(prop, oldV, newV) {
        if (prop === ImageCanvas.observedAttributes[0] && oldV !== newV){
            if (this.image)
                this.canvasPaint(newV, this);
        }
        if (prop === ImageCanvas.observedAttributes[1] && oldV !== newV){
            if (this.image)
                this.canvasPaint(newV.src, this);
        }
        if (prop === ImageCanvas.observedAttributes[2] && oldV !== newV){
            this._width = newV;
            // if (this.image)
            // this.canvasPaint(this.src, this);
        }
        if (prop === ImageCanvas.observedAttributes[3] && oldV !== newV){
            this._height = newV;
            // if (this.image)
            // this.canvasPaint(this.src, this);
        }
    }
    HTMLTemplate() {
        return `
<div class='w3-col s12 w3-border' >
 
  <input type='file' hidden accept="image/*" >
</div>
<button class="w3-btn width">Fit width</button>
<button class="w3-btn height">Fit height</button>
        `;
    }

    loadTargetElements() {
        this.defaultImg = this.rawImg;
        this._imageQuality = 0.75;
        this.container = this.getElements('div')[0];
        this.canvas = addEl('canvas');
        this.input = this.getElements('input')[0];
        this.fitWidth = this.getElements("button.width")[0];
        this.fitHeight = this.getElements("button.height")[0];
        this.image = new Image();
        this.image.crossOrigin = 'Anonymous';
        this.fileReader = new FileReader();
        this.canvas.ondragover = this.fix;
        this.canvasSize = this.width;
        this.canvas.width = this.canvasSize;
        this.canvas.height = this.height;
        this.bgColor = "#ffffff";
        // this.canvas.style.maxHeight = '1';
        this.canvas.style.maxWidth = '100%';
        this.container.prepend(this.canvas);
        this.context = this.getElementContext(this.canvas);
        this.canvasPaint(this.src?this.src:this.rawImg, this);
        this._isDefault = true;
    }
    attachAttributesNLogic() {
        this.canvas.onclick = this.imagePick.bind(this);
        this.fitWidth.onclick = this.loadWidthScaled.bind(this);
        this.fitHeight.onclick = this.loadHeightScaled.bind(this);
        this.canvas.ondrop = this.loadImg.bind(this);
        this.input.onchange = this.canvasEvents.bind(this);
        this.changes = new CustomEvent('changes', {data: this._src})
    }
    getElementContext(element) {
        return element.getContext('2d');
    }
    reset() {
        this.input.value = '';
        this.src = this.defaultImg;
        this._isDefault = true;
    }
    loadWidthScaled(event) {
        this.scaleBy = "width";

        this.canvasPaint(window.workingArea, this);
    }
    loadHeightScaled(event) {
        this.scaleBy = "height";
        this.canvasPaint(window.workingArea, this);
    }
    fix(event) {
        event.preventDefault();
    }
    imagePick() {
        this.input.click();
    }
    loadImg(event) {
        this.fix(event);
        const {context, canvasPaint} = this;
        if (event.dataTransfer.items.length && event.dataTransfer.items[0].kind === 'file') {
            this.file = event.dataTransfer.items[0].getAsFile();
            const fileReader = new FileReader();
            fileReader.onload = ({target}) => {
                // context.clearRect(0, 0, context.canvas.width, context.canvas.height);
                context.fillStyle = 'white';
                context.fillRect(0, 0, context.canvas.width, context.canvas.height);
                this._isDefault = false;
                if (target.result) {
                    canvasPaint(target.result, this);
                }
            };
            fileReader.readAsDataURL(this.file);
        }
    }
    scaleWidth(){
        const {naturalWidth, naturalHeight} = this.image;
        const {height, width} = this.context?.canvas;
        const scaleWidth = (naturalWidth / width) > (naturalHeight / height);
        const scalar = (naturalWidth / width);
        const scalarH = (naturalWidth / width);
        return {
            deltaX: 0, deltaY: (height - (naturalHeight / scalarH)) / 2,
            originX: 0, originY: 0,
            naturalHeight,
            naturalWidth,
            scaledX: naturalWidth / scalar ,
            scaledY: naturalHeight / scalar,
            scalar,
            scale_width: scaleWidth
        };
    }
    scaleHeight() {
        const {naturalWidth, naturalHeight} = this.image;
        const {height, width}  = this.context?.canvas;
        // configuration
        const scaleWidth = false;
        const scalar = (naturalHeight / height);
        return   {
            deltaX: (width - (naturalWidth / scalar)) / 2, deltaY:  0,
            originX: 0, originY: 0,
            naturalHeight,
            naturalWidth,
            scaledX: naturalWidth / scalar,
            scaledY: naturalHeight / scalar,
            scalar,
            scale_width: scaleWidth
        };
    }

    contextLoader(src, self) {
        const {context, image} = self;
        const io = self.ioLoader(self.scaleBy);
        context.fillStyle = self.bgColor;
        context.fillRect(0, 0, self.canvas.width, self.canvas.height);
        context.drawImage(
            image,
            io.originX, io.originY,
            io.naturalWidth, io.naturalHeight,
            io.deltaX, io.deltaY,
            io.scaledX, io.scaledY
        );
        if (self.src !== src) {
            window.workingArea = image.src;
            self.src = self.canvas.toDataURL('image/jpeg', self.imageQuality);
        }
    }

    get scaleBy() {
        return this._scaleBy;
    }
    set scaleBy(scaleByIn) {
        this._scaleBy = scaleByIn;
    }

    get bgColor() {
        return this._bgColor;
    }
    set bgColor(bgColorIn) {
        this._bgColor = bgColorIn;
    }

    ioLoader(scalar) {
        switch (scalar) {
            case 'width':
                return this.scaleWidth();
            case 'height':
                return this.scaleHeight();
            default:
                return this.calcNewSize();
        }
    }

    canvasEvents({target}) {
        const {context, fileReader} = this;
        fileReader.onload = event => {
            this.context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            this._isDefault = false;
            this.canvasPaint(event.target.result, this);
        }
        fileReader.readAsDataURL(target.files[0]);
    }

    get image() {
        return this._image;
    }
    set image(newImage) {
        this._image = newImage;
        if (this.image){
            this.canvasPaint(this.image.src, this);
        }
    }

    get isDefault() {
        return this._isDefault;
    }

    get src() {
        return this._src;
    }
    set src(data) {
        this._src = data;
        if(this.image) {
            this.image.src = data;
            this.canvasPaint(this._src, this);
        }
    }

    /**
     * @return {Promise<blob>}
     * */
    get blob() {
        return new Promise((resolve, reject) => {
            if (!this.canvas){
                reject('element not ready');
            }
            this.canvas.toBlob((blob) => {
                if (!blob){
                    reject('no data in element');
                }
                resolve(blob);
            }, 'image/jpeg')
        })
    }
    canvasPaint(src, self) {
        const {image, contextLoader} = self;
        try {
            image.src = src;
        } catch (e) {
            image.src = self.rawImg;
        }
        image.onload = () => {
            contextLoader(src,self)

            // self.setAttribute('data', self.src);
            self.dispatchEvent(self.changes);
        };
        if(image.src !== src){image.objectPosition = 'center'}
    }
    calcNewSize() {
        const {canvasSize, width, height} = this;
        const {naturalWidth,naturalHeight} = this.image;
        // configuration
        const scale_width = (naturalWidth / canvasSize) > (naturalHeight/this.context.canvas.height);
        const scalar = scale_width ? (naturalWidth / canvasSize) : (naturalHeight/this.context.canvas.height);
        const scale_height = (naturalHeight / height) > (naturalWidth/this.context.canvas.width);
        const scalar_h = scale_height ? (naturalHeight / height) : (naturalWidth/this.context.canvas.width);
        return   {
            deltaX: scale_width? 0: (this.context.canvas.width - (naturalWidth/scalar)) / 2, deltaY: scale_height? 0: (this.context.canvas.height - (naturalHeight/scalar_h)) / 2 ,
            originX: 0, originY: 0,
            naturalHeight,
            naturalWidth,
            scaledX: scale_width ? naturalWidth/scalar : naturalWidth/scalar,
            scaledY: scale_width ? naturalHeight/scalar: naturalHeight/scalar,
            scalar,
            scale_width
        };
    }
    contextLoad(context, target, canvasPaint, self) {
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        if (target.result) {
            canvasPaint(target.result, self);
        }
    }
}

export const modalMixIn = Base => class extends Base {
    HTML() {
        return `<div class="w3-modal ">
    <div class="w3-modal-content w3-card w3-animate-zoom">
        <h4 class="w3-center"><span class="modalTitle">${this.modalTitle}</span> <button class="w3-btn w3-red w3-right close">&times;</button></h4>
        <div class="w3-col s12 l6 m6"> 
            <div class="canvas"></div>
        </div>
    </div>
</div>`;
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
