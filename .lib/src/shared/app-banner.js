import {BannerModal} from "./banner-modal.js";
// import {saveData, getData} from "../js/data/crud-core.js";
// import {uploadImage} from "../js/data/crud-core.js";
import {ImageBase, DOMElement, imageDisplay} from "../core/index.js";
import {BannerModel} from "../data/models/banner-model.js";
import {win} from "../core/index.js";
import { file, tables } from "../data/lazy-ops.js";


export async function* animation(slides = [], cb = () => undefined) {
  let counter = 0;
  while (true) {
    counter++;
    slides.forEach(slide => slide.classList.add('w3-hide'));
    slides[counter % slides.length].classList.remove('w3-hide');
        console.log('display', counter % slides.length);

    yield* delay(5000, counter%slides.length, cb);
  }
}

export function* delay(delayDuration, idx = 0, cb = () => undefined) {
  return new Promise((resolve) => setTimeout(() => {cb(idx);resolve(idx); }, delayDuration));
}

export class AppBanner extends ImageBase(DOMElement) {
    static get is() {return 'app-banner';}
    HTML() {
        return `
<div class="vh-50 w3-display-container ofh">
    <img src='${this.src??this.rawImg}' alt="" class="w3-image vw-100 w3-purple">
    <img alt="" class="w3-image vw-100 w3-hide">
    <img alt="" class="w3-image vw-100 w3-hide">
    <div class="paintOver w3-grid place-center">
        <div>
            <p class="w3-center w3-text-white">Sub Text</p>
            <h1 class="w3-center w3-text-white">Main Text</h1>
            <div class="w3-center">
                <button class="w3-btn w3-round w3-border w3-border-white">Shop Now</button> 
            </div> 
        </div>
    </div>
</div>
<banner-modal></banner-modal>
        `;
    }
    /**
     * @property {BannerModal} modal
     * */
    loadTargetElements() {
        this.bg = this.getElements('img')[0];
        this.slides = this.getElements('img.w3-image.vw-100');
        this.modal = this.getElements(BannerModal.is)[0];
        this.container = this.getElements('div.w3-display-container')[0];
        this.textDisplay = this.getElements('h1')[0];
        this.textDisplay2 = this.getElements('p.w3-center')[0];
        this.button = this.getElements('button')[0];
    }
    attachAttributesNLogic() {
        const {modal}  = this;
        /* getData(this.pageKey).then(results => {
            const banner = results.filter(el => el.description === 'banner')[0]
            if (banner){
                this.bg.src = banner.image;
                this.bg.alt = banner.name;
            }
        }).catch(e => console.log(e)); */
        let mdl = {banners:[]};
        const getBlobs = async (banners  = []) => {
            for(let i = 0; i< banners.length; i++)
                banners[i].blob = await win.crud().blobGet(!banners[i].image.url ? banners[i].image: banners[i].image.url);
            return banners;
        }
        const displayText = (banners) => {
            const c = (idx) => {
                this.textDisplay.innerText = banners[idx%banners.length].name?? "";
                this.textDisplay2.innerText = banners[idx%banners.length].description?? "";
            };
            return c;
        };
        const getData = async () =>  {
            const data = await win.crud().read(tables.banners,['index', '!=', '-1']);
            //console.log({data});
            if (data.length) {
                mdl.banners.push(...data);
                console.log('banner id', data.length);
                await getBlobs(mdl.banners);
                this.slides.forEach((banner, idx) => !!mdl.banners[idx]?imageDisplay(banner, mdl.banners[idx].blob):undefined )
                // imageDisplay(this.bg, mdl.banners[0].blob);
                //this.textDisplay.innerText = mdl.banners[0].description;
                this.gen = animation(Array.from(this.slides), displayText(mdl.banners));
                this.gen.next();
            }
            return mdl; 
        }

        getData().then(m => {modal.banners = m.banners; console.log({m})});
        this.container.onclick = () => {
            modal.model = new BannerModel();
            modal.showing = true;
        }
        modal.addEventListener('closed', async _ =>{
            let {model} = modal;
            //console.log({model, modal});
            this.bg.src = model.image;
            this.bg.alt = model.description;
            this.textDisplay.innerText = model.description;
            this.button.innerText = 'Go To Page';
            //console.log({mdl});
            if (modal.banners.length){
                modal.banners.forEach(async banner => {
                    let bnr = banner;
                    if (!bnr.image)
                    bnr.image = (await win[file.setImg](banner.blob,`bnr-${banner.id}.jpg`)).url;
                    delete bnr.blob;
                    await win.crud().create(tables.banners, bnr);
                });
                
            }
            /* const task = uploadImage(model.image,`${model.id}.jpg`, this.pageKey);
            task.then(url => {
            model.image = url;
                this.bg.src = model.image;
                // console.log({mdl: model});
                saveData(this.pageKey, cleanObj(model));
            }); */
        });
        // console.log(this.bg.style);
    }
}
