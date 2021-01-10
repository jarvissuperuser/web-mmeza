import {Root} from "../root.js";
import {doc} from "../abstraction.js";
import {pages}  from "../../js/data/page-data.js";

export class AppFullPage extends Root {
    static get is() {
        return 'app-fullpage';
    }
    HTMLTemplate() {
        return `
<div class="pg-container">
</div>
        `;
    }
    loadSlots() {
        super.loadSlots();
        this.container = this.getElements('.pg-container')[0];
        this.pageTemplate = doc.createElement('app-layout');
        this.contentSlot = doc.createElement('div');
        this.pagesContent = [];
    }
    loadAttributes() {
        // super.loadAttributes();
        for(let page = 0; page < pages.length; page++){
            const pageClone = this.pageTemplate.cloneNode(true);
            const content = this.contentSlot.cloneNode(true);
            content.setAttribute('slot','content');
            content.setAttribute('class', "content-home w3-col s12 w3-grid grid-container");
            pageClone.setAttribute('class', "pg-page w3-black vh-100 bg-1");
            this.classList.add('pg-wrapper');
            content.innerHTML = pages[page].content;
            pageClone.appendChild(content);
            pageClone.setAttribute('index', (page + 1));
            this.pagesContent.push(pageClone);
            this.container.appendChild(pageClone);
        }
        // console.log(pages);
    }
}
