import {Core} from '../core/index.js';

export class EditorPage extends Core {
    static get is() {
        return 'editor-page';
    }
    HTMLTemplate() {
        return `
<div class="w3-black vh-100">
    <div class="w3-margin-top-big">
        <article-editor></article-editor>
    </div>
</div>        
        `;
    }
}
