import { dropZoneMixin, StepBase} from "../core/index.js";

export class UploadCard extends dropZoneMixin(StepBase) {
    static get is() {return "upload-card"}
    HTML() {
        return `<div class="w3-padding">
    <h3 class="w3-text-dark-gray"> Step <span id="idx">{{index}}</span> </h3>
    <div class="w3-border w3-border-gray w3-padding w3-padding-32 w3-col s12 w3-round w3-round-xlarge" drop-target>
        <span class="w3-right w3-text-large pointer w3-tag bg-theme w3-text-red close">&times;</span>
        <h4 contenteditable="true" placeholder="Add name of uploaded" class="w3-text-gray w3-padding">Add name of uploaded</h4>
        <p contenteditable="true" placeholder="Description of upload" class="w3-text-gray w3-padding">Description of upload</p>
        <div class="w3-col pointer">
            <div class="w3-col s4 w3-tag w3-round w3-round-xxlarge w3-border w3-border-blue fix-right w3-blue click">choose file</div>
            <div class="w3-col s8 w3-tag w3-round w3-round-xxlarge w3-border w3-border-blue fix-left bg-theme click"> no file selected </div>
            <input type="file" hidden="" >
        </div>
    </div>    
</div>`;
    }

    loadTargetElements(){
        this.zoneClick = this.getElements('input[type=file]')[0];
        this.uploadElement = this.getElements('.click');
        this.dropZone = this.getElements('[drop-target]');
        this.close = this.getElements('.close')[0];
        this.loadIndex();
        this.model.stepType = UploadCard.is;
        super.loadTargetElements();
    }
    attachAttributesNLogic() {
        this.uploadElement.forEach(element => {
            element.onclick = () => {
                this.zoneClick.click();
            }
        });
        const listFiles = (files) =>  {
            this.uploadElement[1].textContent = Array.from(files)[0].name
                console.log({post: Array.from(files)[0].name});
        }
        this.zoneClick.onchange = ev => {
            let {target} = ev;
            listFiles(target.files);
        };

        this.attachDropZone(listFiles);
        super.attachAttributesNLogic();
    }


    cinOnBlur(input) {
        const content = input.textContent.trim();
        if (input.tagName.toLowerCase() === 'h4'){
            this.model.data.title = !!content ? content: '';
        }
        if (input.tagName.toLowerCase() === 'p'){
            this.model.data.description = !!content ? content: '';
        }
        super.cinOnBlur(input)
    }

}
