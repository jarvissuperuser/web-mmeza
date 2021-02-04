import {Root} from "../common/root.js";

export class EditorPage extends Root {
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