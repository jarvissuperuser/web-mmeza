import {Root, addEl} from '../core/index.js';
import {ImageBase} from '../core/mix-ins/image-base.js';

export class ImageCanvas extends ImageBase(Root) {
    static get is() {
        return 'image-canvas';
    }
    static get observedAttributes() {
        return ['src', 'width']
    }
    attributeChangedCallback(prop, oldV, newV) {
        if (prop === ImageCanvas.observedAttributes[0] && oldV !== newV){
            if (this.image)
                this.canvasPaint(newV, this);
        }
        if (prop === ImageCanvas.observedAttributes[1] && oldV !== newV){
            this._width = newV;
            // if (this.image)
            // this.canvasPaint(this.src, this);
        }
        if (prop === ImageCanvas.observedAttributes[2] && oldV !== newV){
            this._height = newV;
            // if (this.image)
            // this.canvasPaint(this.src, this);
        }
    }
    HTMLTemplate() {
        return `
<div class='w3-col s12' >
 
  <input type='file' hidden >
</div>
        `;
    }

    loadSlots() {
        this.defaultImg = this.rawImg;
        this._imageQuality = 0.75;
        this.container = this.getElements('div')[0];
        this.canvas = addEl('canvas');
        this.input = this.getElements('input')[0];
        this.image = new Image();
        this.image.crossOrigin = 'Anonymous';
        this.fileReader = new FileReader();
        this.canvas.ondragover = this.fix;
        this.canvasSize = this.width;
        this.canvas.width = this.canvasSize;
        this.canvas.height = this.height;
        this.canvas.style.maxHeight = this.maxCanvasHeight;
        this.container.prepend(this.canvas);
        this.context = this.getElementContext(this.canvas);
        this.canvasPaint(this.src?this.src:this.rawImg, this);
    }
    loadAttributes() {
        this.canvas.onclick = this.imagePick.bind(this);
        this.canvas.ondrop = this.loadImg.bind(this);
        this.input.onchange = this.canvasEvents.bind(this);
        this.changes = new CustomEvent('changes', {data: this._src})
    }
    getElementContext(element) {
        return element.getContext('2d');
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
                if (target.result) {
                    canvasPaint(target.result, this);
                }
            };
            fileReader.readAsDataURL(this.file);
        }
    }
    canvasEvents({target}) {
        const {context, fileReader} = this;
        fileReader.onload = event => {
            this.context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            this.canvasPaint(event.target.result, this);
        }
        fileReader.readAsDataURL(target.files[0]);
    }

    get src() {
        return this._src;
    }
    set src(data) {
        this._src = data;
        if(this.image)
            this.canvasPaint(this._src, this);
    }
    canvasPaint(src, self) {
        // console.trace(src);
        const {image, context} = self;
        try {
            image.src = src;
        } catch (e) {
            image.src = self.rawImg;
        }

        image.onload = () => {
            const io = self.calcNewSize();
            context.fillStyle = '#ffffff';
            context.fillRect(0, 0, self.width, self.height);
            context.drawImage(
                image,
                io.originX,io.originY,
                io.naturalWidth, io.naturalHeight,
                io.deltaX, io.deltaY,
                io.scaledX, io.scaledY
            );
            if (self.src!==src)
                self._src = self.canvas.toDataURL('image/jpeg', this.imageQuality);

            self.setAttribute('data', self.src);
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
}
