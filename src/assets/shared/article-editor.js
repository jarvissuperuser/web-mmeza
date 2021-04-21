import {Root, addEl} from '../core/index.js';
import {ArticleModel} from '../models/article-model.js';

export class ArticleEditor extends Root {
    static get is() {
        return 'article-editor';
    }
    HTMLTemplate() {
        return `
<div class='w3-container'>
  <div class='w3-content'>
    <div class='w3-col s12 m8 l8 article w3-padding'>
      <h1 class='title' contenteditable='true' placeholder="Edit Article Title" ></h1>
      <h3 class='subtitle' contenteditable='true' placeholder="Edit Article Subtitle" ></h3>
      <div class='w3-col s12'>
        <span>By
          <span class='author'>default editor</span>
        </span>
        <span class='w3-right'>Date:
          <span class='date' ></span>
        </span>
      </div>
      <div class='w3-col s12'>
        <image-canvas></image-canvas>
      </div>
      <div class='w3-col content'>
      </div>
      <div class='w3-center w3-col s12'>
        <div class='w3-dropdown-hover'>
        <div class='w3-dropdown-content w3-card-4 w3-padding' style='transform: translateX(-40%);position:absolute;'>
              <div class='w3-row '>
                <div class='w3-third'><span class='w3-button para' title="add text">&#182;</span></div>
                <div class='w3-third'><span class='w3-button picture' title="add Picture"></span></div>
                <div class='w3-third'><span class='w3-button video'></span></div>
              </div>
          </div>
          <div class='w3-button' title='add components'>&#43; </div>
          
        </div>
      </div>
    </div>
    <div class='w3-col m3 l3 w3-hide-small w3-padding'></div>
  </div>
</div>
        `;
    }
    loadStyle(styleFile = './styles.css') {
        super.loadStyle(styleFile);
        const style = `
            [placeholder]:empty::before {content: attr(placeholder);color: #555;}
            .video::after {content: "📺"}
            .picture::after {content: "📷"}
        `;
        this.setStyles(style);
    }

    loadSlots() {
        this.art = this._article ? this._article :  new ArticleModel();
        this.values = Object.keys(this.art);
        this.slots = [];
        this.actionButtons = this.getElements('.w3-third span.w3-button');
    }

    set article(art) {
        this._article = art;
    }
    get article() {
        return this._article;
    }

    loadAttributes() {
        console.log(this.values, this.art);
        this.values.forEach(v => {
            if (this.getElements(`.${v}`).length) {
                if (typeof this.art[v] === 'string'){

                }
                this.slots.push(this.getElements(`.${v}`)[0]);
            }
            if(v === 'content' && !this.art.content.length) {
                this.addParagraph();
                console.log(this.art.content);
                this.processContent(this.getElements(`.${v}`)[0], this.art.content)
            }
        });
        console.log(this.actionButtons);
        if (this.actionButtons) {
            this.actionButtons.forEach(button => {
                if (button.classList.contains('para')) {
                    button.onclick = () => {
                        this.addParagraph();
                        this.bindLastElement();
                    }
                }
                if (button.classList.contains('picture')) {
                    button.onclick = () => {
                        this.addPicture();
                        this.bindLastElement();
                    }
                }
                if (button.classList.contains('video')) {
                    button.onclick = () => {
                        console.log({article:this.art});
                    }
                }
            });
        }
    }
    processContent(element, content = []) {
        content.forEach(el => {
            element.append(el);
        });
    }
    bindLastElement() {
        this.getElements('.content')[0].append(this.art.content[this.art.content.length-1]);
        this.art.content[this.art.content.length-1].scrollIntoView({behavior: "smooth"});
    }

    addParagraph() {
        const paragraphElement = addEl('p');
        paragraphElement.contentEditable = 'true';
        paragraphElement.classList.add('w3-col');
        paragraphElement.setAttribute('placeholder', 'Edit Paragraph here');
        this.art.content.push(paragraphElement);
    }
    addPicture() {
        const pic = addEl('image-canvas');
        this.art.content.push(pic);
    }
}
