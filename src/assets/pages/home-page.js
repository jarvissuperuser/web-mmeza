import { doc, DOMElement } from '../core/index.js';

export class HomePage extends DOMElement {
	static get is() {
		return 'home-page';
	}
	HTML() {
		return `
<div class="pg">
</div>
`;
	}
	loadTargetElements() {
		super.loadTargetElements();
		this.content = this.getElements('div')[0];
		this.fullPageScroll = doc.createElement('db-calc');
	}

	attachAttributesNLogic() {
		super.attachAttributesNLogic();
		//this.fullPageScroll.pages = pages;
		console.log()
		this.content.append(this.fullPageScroll);
	}
}
