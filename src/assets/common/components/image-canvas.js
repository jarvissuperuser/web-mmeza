import {Root} from "../root.js";

export class ImageCanvas extends Root {
    static get is() {
        return 'image-canvas';
    }
    static get observedAttributes() {
        return ['src', 'width']
    }
    attributeChangedCallback(prop, oldV, newV) {
        if (prop === ImageCanvas.observedAttributes[0] && oldV !== newV){
            this.defaultImg = newV;
            this.canvasPaint(this.defaultImg, this);
        }
        if (prop === ImageCanvas.observedAttributes[1]){
            this._width = newV;
            this.loadSlots();
            this.canvasPaint(this.defaultImg, this);
        }
    }
    HTMLTemplate() {
        return `
<div class='w3-col s12' >
  <canvas
          class='w3-border w3-white'
          height='300'
  >
  </canvas>
  <input type='file' hidden >
</div>
        `;
    }

    loadSlots() {
        console.log('image slots loading...', this.width)
        this.defaultImg = this.rawImg;
        this.canvas = this.getElements('canvas')[0];
        this.input = this.getElements('input')[0];
        this.canvasSize = this.width;
        this.canvas.width = this.canvasSize;
        this.context = this.getElementContext(this.canvas);
        this.image = new Image();
        this.fileReader = new FileReader();
    }
    loadAttributes() {
        this.canvas.ondragover = this.fix;
        this.canvas.onclick = this.imagePick.bind(this);
        this.canvas.ondrop = this.loadImg.bind(this);
        this.input.onchange = this.canvasEvents.bind(this);
        this.changes = new CustomEvent('changes', {data: this._src})
        this.canvasPaint(this.defaultImg, this);
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
    get width() {
        return !!this._width?
            (this.getAttribute('width')?this.getAttribute('width'):this._width)
            :621;
    }
    set width(width) {
        this._width = width;
        this.setAttribute('width', this._width.toString())
    }
    get src() {
        return this._src;
    }
    set src(data) {
        this.defaultImg = data;
    }
    canvasPaint(src, self) {
        const {image, context} = self;
        image.onload = () => {
            const io = self.calcNewSize();
            context.fillStyle = '#ffffff';
            context.fillRect(0, 0, self.width, 300);
            context.drawImage(
                self.image,
                io.originX,io.originY,
                io.naturalWidth, io.naturalHeight,
                io.deltaX, io.deltaY,
                io.scaledX, io.scaledY
            );
            self._src = self.canvas.toDataURL('image/jpeg');
            self.setAttribute('data', self._src);
            self.dispatchEvent(self.changes);
        };
        if(image.src !== src){image.src = src; image.objectPosition = 'center'}
    }
    calcNewSize() {
        const {canvasSize} = this;
        const {naturalWidth,naturalHeight} = this.image;
        // configuration
        const scale_width = (naturalWidth / canvasSize) > (naturalHeight/this.context.canvas.height);
        const scalar = scale_width ? (naturalWidth / canvasSize) : (naturalHeight/this.context.canvas.height);
        return   {
            deltaX: scale_width? 0: (this.context.canvas.width - (naturalWidth/scalar)) / 2, deltaY:scale_width? 0: (this.context.canvas.height - (naturalHeight/scalar)) / 2 ,
            originX: 0, originY: 0,
            naturalHeight,
            naturalWidth,
            scaledX: scale_width ? naturalWidth/scalar : naturalWidth/scalar,
            scaledY: scale_width ? naturalHeight/scalar: naturalHeight/scalar,
            scalar,
            scale_width
        };
    }
    get rawImg() {
        return `data:image/svg+xml;utf8,<svg
    xmlns:svg="http://www.w3.org/2000/svg"
    xmlns="http://www.w3.org/2000/svg"
    width="${this.canvasSize}"
    height="300"
    viewBox="0 0 172.77291 79.375002"
    version="1.1"
    id="svg8">
    <defs
      id="defs2">
      <rect
        x="58.459518"
        y="53.316837"
        width="89.51816"
        height="31.179274"
        id="rect835" />
    </defs>
    <g
      id="layer1">
      <g
        aria-label="Drop or Click
To Add Image"
        transform="translate(-16.148632,-29.517176)"
        id="text833"
        style="font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:10.5833px;line-height:1.25;letter-spacing:0px;word-spacing:0px;white-space:pre;">
        <path
          id="path65"
          style="text-align:center;text-anchor:middle"
          d="m 71.184632,55.822705 c 0,1.999872 0,3.999743 0,5.999615 1.720743,0.118881 4.160987,-0.04892 4.294297,-2.27957 0.655931,-2.370557 -1.523417,-4.198952 -3.78124,-3.720045 -0.171019,0 -0.342038,0 -0.513057,0 z m -1.043861,-0.857826 c 2.20334,0.03392 5.263837,-0.404152 6.223115,2.129062 1.049804,2.514268 -0.526729,5.863757 -3.538856,5.57159 -0.763812,-0.251454 -2.640159,0.560304 -2.684259,-0.434092 0,-2.422186 0,-4.844373 0,-7.26656 z" />
        <path
          id="path67"
          style="text-align:center;text-anchor:middle"
          d="m 81.602567,57.781236 c -2.142763,-0.943971 -2.672682,1.632709 -2.433952,3.196128 -0.03771,0.848555 0.355192,2.12772 -0.956011,1.70278 0,-1.929247 0,-3.858495 0,-5.787742 1.561613,-0.634951 0.424916,1.985007 1.736323,0.118855 0.981628,-0.370401 1.944399,-0.59058 1.65364,0.769979 z" />
        <path
          id="path69"
          style="text-align:center;text-anchor:middle"
          d="m 84.610126,57.559028 c -2.834713,0.100854 -1.774189,5.928823 0.962147,4.127642 1.126883,-1.077292 0.975664,-4.067399 -0.962147,-4.127642 z m 0,-0.80615 c 3.559956,-0.184358 3.55878,6.260968 0,6.077129 -3.570096,0.215016 -3.555293,-6.295558 0,-6.077129 z" />
        <path
          id="path71"
          style="text-align:center;text-anchor:middle"
          d="m 89.762249,61.811985 c 0,1.02319 0,2.04638 0,3.06957 -1.355172,0.438226 -0.891938,-0.941954 -0.956011,-1.794827 0,-2.064774 0,-4.129549 0,-6.194324 1.517975,-0.58751 0.493134,1.827533 1.710484,0.113688 3.571546,-1.659253 4.883903,4.915782 1.597766,5.771593 -0.885958,0.19581 -1.921795,-0.112118 -2.352239,-0.9657 z m 3.234934,-2.020542 c 0.46026,-3.242481 -4.249474,-2.4653 -3.208127,0.496415 0.120899,2.667154 3.611979,2.001951 3.208127,-0.496415 z" />
        <path
          id="path73"
          style="text-align:center;text-anchor:middle"
          d="m 101.1672,57.559028 c -2.834712,0.100855 -1.774188,5.928822 0.96215,4.127642 1.12687,-1.077291 0.97566,-4.067403 -0.96215,-4.127642 z m 0,-0.80615 c 3.55996,-0.184361 3.55878,6.260971 0,6.077129 -3.570094,0.215014 -3.55529,-6.295556 0,-6.077129 z" />
        <path
          id="path75"
          style="text-align:center;text-anchor:middle"
          d="m 108.75328,57.781236 c -2.14276,-0.943971 -2.67269,1.632707 -2.43396,3.196128 -0.0377,0.848554 0.35519,2.127719 -0.95601,1.70278 0,-1.929247 0,-3.858495 0,-5.787742 1.56161,-0.634949 0.42491,1.985009 1.73633,0.118855 0.98163,-0.370404 1.9444,-0.590577 1.65364,0.769979 z" />
        <path
          id="path77"
          style="text-align:center;text-anchor:middle"
          d="m 118.9335,55.559156 c 0.47563,2.382884 -2.21838,-1.076255 -3.56049,0.326852 -2.53641,1.168031 -1.98866,6.287503 1.16788,6.086173 1.21248,-0.01063 3.23762,-1.626727 2.11453,0.288095 -2.17458,1.379908 -5.67858,0.243278 -5.88076,-2.551193 -0.63141,-2.485728 1.33846,-5.319827 4.04528,-4.872103 0.751,0.05079 1.49223,0.294428 2.11356,0.722176 z" />
        <path
          id="path79"
          style="text-align:center;text-anchor:middle"
          d="m 120.50446,54.639319 c 1.3538,-0.438577 0.88405,0.946399 0.95084,1.794827 0,2.082 0,4.164 0,6.246 -1.3538,0.438577 -0.88405,-0.946399 -0.95084,-1.794827 0,-2.082 0,-4.164 0,-6.246 z" />
        <path
          id="path81"
          style="text-align:center;text-anchor:middle"
          d="m 123.44484,56.892404 c 1.3538,-0.438577 0.88405,0.946399 0.95084,1.794827 0,1.330971 0,2.661943 0,3.992915 -1.3538,0.438577 -0.88405,-0.946399 -0.95084,-1.794827 0,-1.330971 0,-2.661943 0,-3.992915 z m 0,-2.253085 c 1.05745,-0.650994 1.42379,1.322645 0.50213,1.204057 -0.88566,0.25941 -0.36338,-0.717309 -0.50213,-1.204057 z" />
        <path
          id="path83"
          style="text-align:center;text-anchor:middle"
          d="m 130.55033,57.114612 c 0.40343,1.892935 -3.22427,-0.853296 -3.4481,1.736323 -1.09195,2.434693 1.88858,3.888156 3.4481,2.878075 -0.30647,2.336596 -5.02727,0.800216 -4.56649,-1.597712 -0.44919,-2.587267 2.39244,-4.190347 4.56649,-3.016686 z" />
        <path
          id="path85"
          style="text-align:center;text-anchor:middle"
          d="m 132.16779,54.639319 c 1.35517,-0.438226 0.89195,0.941946 0.95602,1.794827 0,0.98474 0,1.969481 0,2.954222 1.00937,-0.795298 1.91456,-1.866739 2.98659,-2.495964 1.65913,-0.285713 0.55628,0.472715 -0.16898,1.088401 -0.40793,0.611853 -1.9421,1.199151 -1.62028,1.826916 0.99443,0.957475 1.98885,1.91495 2.98328,2.872425 -1.01215,0.248753 -1.70734,-0.289555 -2.31848,-1.036561 -0.57848,-0.447676 -1.46589,-1.620866 -1.86213,-1.640562 -0.0992,0.843041 0.19883,2.083291 -0.14957,2.677123 -1.31391,0.39696 -0.65202,-1.181877 -0.80645,-1.944396 0,-2.032143 0,-4.064287 0,-6.096431 z" />
        <path
          id="path87"
          style="text-align:end;text-anchor:end"
          d="m 67.435518,68.295125 c 2.175571,0 4.351142,0 6.526713,0 0.41102,1.351984 -1.126112,0.755817 -1.944396,0.878497 -1.307284,-0.394337 -0.634833,1.191061 -0.794446,1.944396 0,1.630791 0,3.261583 0,4.892374 -1.334209,0.436113 -1.067918,-0.728273 -1.049028,-1.645258 0,-1.730504 0,-3.461008 0,-5.191512 -0.912948,0 -1.825895,0 -2.738843,0 0,-0.292832 0,-0.585665 0,-0.878497 z" />
        <path
          id="path89"
          style="text-align:end;text-anchor:end"
          d="m 75.372993,70.889274 c -2.834713,0.100854 -1.774189,5.928823 0.962147,4.127642 1.126883,-1.077292 0.975664,-4.067399 -0.962147,-4.127642 z m 0,-0.80615 c 3.559955,-0.184357 3.55878,6.260967 0,6.077129 -3.570096,0.215016 -3.555293,-6.295558 0,-6.077129 z" />
        <path
          id="path91"
          style="text-align:end;text-anchor:end"
          d="m 85.589391,69.323483 c -0.471976,1.279849 -0.943953,2.559698 -1.415929,3.839547 0.945676,0 1.891351,0 2.837027,0 -0.473699,-1.279849 -0.947399,-2.559698 -1.421098,-3.839547 z m -0.589109,-1.028358 c 1.199065,-0.371793 1.492118,0.571285 1.769304,1.537392 0.784821,2.059291 1.569641,4.118583 2.354462,6.177875 -1.193812,0.401737 -1.356642,-0.656672 -1.63574,-1.550413 -0.25257,-0.91625 -1.654175,-0.205159 -2.395792,-0.428788 -1.150363,-0.340432 -1.538855,0.398146 -1.734769,1.409466 -0.01218,1.014776 -2.004939,0.728002 -0.98293,-0.268655 0.875155,-2.292292 1.75031,-4.584585 2.625465,-6.876877 z" />
        <path
          id="path93"
          style="text-align:end;text-anchor:end"
          d="m 93.831757,71.101147 c 0,-1.043861 0,-2.087721 0,-3.131582 1.3538,-0.438577 0.88405,0.946396 0.950843,1.794827 0,2.082 0,4.164 0,6.246 -1.513441,0.581821 -0.487307,-1.822314 -1.710485,-0.09819 -3.57305,1.64652 -4.874907,-4.919919 -1.595827,-5.776761 0.884962,-0.197151 1.920402,0.120586 2.355469,0.965701 z m -3.240102,2.020542 c -0.469859,3.245891 4.256276,2.466919 3.212972,-0.496092 -0.131536,-2.662268 -3.615298,-2.005602 -3.212972,0.496092 z" />
        <path
          id="path95"
          style="text-align:end;text-anchor:end"
          d="m 100.54967,71.101147 c 0,-1.043861 0,-2.087721 0,-3.131582 1.3538,-0.438577 0.88405,0.946399 0.95084,1.794827 0,2.082 0,4.164 0,6.246 -1.51344,0.581821 -0.4873,-1.822314 -1.71048,-0.09819 -3.57305,1.64652 -4.874909,-4.919919 -1.595828,-5.776761 0.884961,-0.19715 1.920408,0.120585 2.355468,0.965701 z m -3.240101,2.020542 c -0.469859,3.245891 4.256271,2.466919 3.212971,-0.496092 -0.13153,-2.662269 -3.615298,-2.005601 -3.212971,0.496092 z" />
        <path
          id="path97"
          style="text-align:end;text-anchor:end"
          d="m 106.86451,68.295125 c 1.37668,-0.430455 1.0264,0.86606 1.04386,1.794827 0,1.97348 0,3.94696 0,5.92044 -1.37668,0.430455 -1.0264,-0.86606 -1.04386,-1.794827 0,-1.97348 0,-3.94696 0,-5.92044 z" />
        <path
          id="path99"
          style="text-align:end;text-anchor:end"
          d="m 114.45059,71.33369 c 1.20274,-2.528987 4.73504,-0.757468 3.90672,1.781662 0,0.965013 0,1.930027 0,2.89504 -1.35517,0.438226 -0.89194,-0.941955 -0.95601,-1.794827 0.0478,-1.323262 0.22896,-3.894717 -1.85518,-3.18289 -1.47728,0.875882 -0.7658,2.83039 -0.93534,4.24928 0.32696,1.255854 -1.56739,0.839877 -0.95601,-0.318545 -0.15374,-1.318908 0.44405,-2.97867 -0.66921,-3.952697 -2.05504,-0.638816 -2.27971,1.798889 -2.12131,3.22426 -0.0518,0.858707 0.37298,2.193929 -0.95601,1.775419 0,-1.929247 0,-3.858495 0,-5.787742 1.559,-0.637211 0.42966,1.992035 1.73633,0.113688 1.00789,-0.567397 2.48143,-0.193488 2.80602,0.997352 z" />
        <path
          id="path101"
          style="text-align:end;text-anchor:end"
          d="m 122.88415,73.101018 c -2.79192,-0.783075 -2.21842,3.571502 0.20768,1.949487 0.6929,-0.645428 1.43109,-2.410735 -0.20768,-1.949487 z m 1.89652,-0.39274 c 0,1.100705 0,2.201409 0,3.302114 -1.53301,0.566415 -0.46778,-1.844274 -1.76216,-0.09819 -3.1094,1.8332 -4.50282,-3.888656 -0.83619,-3.547576 2.39205,0.727606 1.56524,-1.937152 -0.48543,-1.445646 -1.41623,1.1179 -2.10308,-0.613388 -0.36819,-0.732511 1.8137,-0.499254 3.64347,0.457803 3.45197,2.521804 z" />
        <path
          id="path103"
          style="text-align:end;text-anchor:end"
          d="m 130.54774,73.049342 c 0.4536,-3.148984 -4.24499,-2.414276 -3.21362,0.485434 0.11638,2.566075 3.62027,1.944394 3.21362,-0.485434 z m 0.95085,2.24275 c 0.75161,2.564951 -3.79544,4.110887 -4.47517,2.016547 0.81848,0.0835 4.2947,0.360738 3.52432,-2.316266 -2.40267,3.189505 -5.8373,-1.767667 -3.57083,-4.097928 0.81398,-1.956325 3.57467,0.219656 3.57083,-0.242001 0.26762,-1.148995 1.44833,-0.05876 0.95085,0.916326 0,1.241107 0,2.482215 0,3.723322 z" />
        <path
          id="path105"
          style="text-align:end;text-anchor:end"
          d="m 138.4077,72.87881 c 0.0819,0.984745 -1.57717,0.228572 -2.24353,0.465087 -1.23519,-0.109267 -3.12331,-0.186702 -1.53917,1.498611 0.87773,1.308481 5.03069,-0.742474 3.04244,1.064531 -2.57977,1.278049 -5.59241,-1.31046 -4.43253,-4.007494 0.90608,-2.860987 5.48923,-2.188906 5.17279,0.979265 z m -0.95084,-0.279052 c 0.45008,-2.867448 -4.5828,-1.347779 -2.94125,0.0045 0.98041,-0.0015 1.96083,-0.003 2.94125,-0.0045 z" />
      </g>
    </g>
  </svg>
`;
    }
}
