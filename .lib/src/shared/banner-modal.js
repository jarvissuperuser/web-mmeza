import {DOMElement, uuid, modalMixIn, imageDisplay, win} from "../core/index.js";
import {BannerModel} from "../data/models/banner-model.js";

const D_IMG = 'assets/img/MiniPlus.jpg';

export class BannerModal extends modalMixIn(DOMElement) {
    static get is() {return 'banner-modal'}
    HTML() {
        return `
<div class="w3-modal ">
    <div class="w3-modal-content w3-card w3-animate-zoom bg-theme">
        <h4 class="w3-center"><span class="modalTitle">${this.modalTitle}</span> <button class="w3-btn w3-red w3-right close">&times;</button></h4>
        <div class="w3-col s12"> 
            <div class="canvas"></div>
        </div>
        <div class="w3-col s12">
        <div class="w3-col s12 l6 m6 w3-padding"> 
            <app-input label="Sub text" Alt" name="description"></app-input>
            <app-input label="Main Text" name="name"></app-input>
            <app-input label="Target" name="target"></app-input>
            <div class="">
                <select class="w3-select">
                    <option value="add">Add New Banner </option>
                    <option value="0">Replace 1st Banner</option>
                    <option value="1">Replace 2nd Banner</option>
                    <option value="2">Replace 3nd Banner</option>
                </select>
            </div>


        </div>
            <div class="w3-col s12 m6 w3-padding">
                                <div class="w3-col s12 ">
                    <img src="assets/img/MiniPlus.jpg" alt="" class="w3-image img0">
                    <img src="assets/img/MiniPlus.jpg" alt="" class="w3-image img1">
                    <img src="assets/img/MiniPlus.jpg" alt="" class="w3-image img2">
                </div>
            </div>
        </div>
        <div class="w3-bar w3-padding"> 
            <div class="w3-padding w3-bar-item"> <button class="w3-btn w3-hover-teal add">Save</button></div>
            <div class="w3-padding w3-bar-item"> <button class="w3-btn w3-hover-red cancel">Cancel</button></div>
        </div>
    </div>
</div>
        `;
    }
    loadTargetElements() {
        super.loadTargetElements();
        this.inputs = this.getElements('app-input');
        this.select  = this.getElements('select')[0];
        this.imgs = this.getElements('img.w3-image');
        this.modalTitle = 'Change Banner';
        this.attachCanvas(1024,500);
        this.buttonText = 'Save';
        this.addUpdateButton();
        this.banners = [];
    }
    attachAttributesNLogic() {
        super.attachAttributesNLogic();
        this.canvasOnChange();
        this.selectOnChange();
    }
    canvasOnChange() {
        this.imageCanvas.addEventListener('changes',async () => {
            let idx = 0;
            let selectedIdx = this.select.value !== 'add'? parseInt(this.select.value):-1;
            this.selectedIdx = selectedIdx;
            const bnr = selectedIdx >= 0? this.banners.filter(b => b.index === selectedIdx)[0]: null;
            let banner = bnr? bnr : new BannerModel();
            if (!this.imageCanvas.isDefault){
                banner.blob = await this.imageCanvas.blob;
                banner.image = '';
            }

            if (this.select.value !== 'add' &&  selectedIdx >= 0 && !this.imageCanvas.isDefault){
                if (!bnr){
                    banner.id = uuid();
                }
                banner.index = selectedIdx;
                banner.description = this.getInputValue('description');
                banner.name = this.getInputValue('name');
                banner.target = this.getInputValue('target');
                this.banners[selectedIdx] = banner;
                imageDisplay(this.imgs[selectedIdx], banner.blob);
                return;
            }
            Array.from(this.imgs).every(async (_) => {
                if (this.imgs[idx].src.includes(D_IMG) && this.select.value === 'add' && !this.imageCanvas.isDefault){
                    imageDisplay(this.imgs[idx], banner.blob);
                    this.select.value = idx.toString();
                    banner.id = uuid();
                    banner.index = idx;
                    banner.name = this.getInputValue('name');
                    banner.description = this.getInputValue('description');
                    banner.target = this.getInputValue('target');
                    this.banners[idx] = banner;
                    this.selectedIdx = idx;
                    return false;
                }
                idx ++;
                return true;
            });
        });
    }
    selectOnChange() {
        this.select.onchange = () => {
            if (this.selectedIdx >= 0 && !!this.getInputValue('name')){
                this.banners[this.selectedIdx].description = this.getInputValue('name');
                this.banners[this.selectedIdx].target = this.getInputValue('target');
                this.selectedIdx = -1;
                this.inputReset();
                this.imageCanvas.reset();
            }
            if (this.select.value !== 'add'){
                let selectedIdx = this.select.value !== 'add'? parseInt(this.select.value):-1;
                let bnr = selectedIdx >= 0? this.banners[selectedIdx]: null;
                if (!bnr) return;
                Array.from(this.inputs)
                    .filter(i => i.getAttribute('name') === 'name')[0].value = bnr.name;
                Array.from(this.inputs)
                    .filter(i => i.getAttribute('name') === 'description')[0].value = bnr.description;
                Array.from(this.inputs)
                    .filter(i => i.getAttribute('name') === 'target')[0].value = bnr.target;
            }
        } 
    }
    inputReset() {
        this.inputs.forEach(i => i.value = '')
    }
    processData() {
        this._model = this.model;
        this._model.id = uuid();
        this._model.image = this.imageCanvas.src;
    }

    loadData() {
        super.loadData();
    }
    getInputValue(nameAttr) {
        return Array.from(this.inputs).filter(i => i.getAttribute('name') === nameAttr)[0].value;
    };
    get model() {
        return this._model ?? new BannerModel();
    }
    set model(mdl) {
        this._model = mdl;
    }

    get banners() {
        return this._banners;
    }

    set banners(val){
        console.assert(val.constructor.name === 'Array');
        this._banners = val;
        if (this.imgs) {
            this.imgs.forEach((i, idx) => {
                if (val[idx]){
                    imageDisplay(i, val[idx].blob);
                }
            })
        }
    }



}
