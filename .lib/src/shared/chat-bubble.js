import {DOMElement, modelMixIn, inputMixin, win, navigate, uuid} from "../core/index.js";
import {TableModel} from "./models/table-model.js";

export class ChatBubble extends inputMixin(modelMixIn(DOMElement)){
    static get is() {return 'chat-Bubble'}
    HTML() {
        return `
<section class="msger">
    <header class="msger-header">
      <div class="msger-header-title">
        <i class="fas fa-comment-alt"></i> Job
      </div>
      <div class="msger-header-options">
        <span><i class="fas fa-cog"></i></span>
      </div>
    </header>
    
    <main class="msger-chat" >
          
    </main>
    
    <div class="msger-inputarea">
      <input type="text" class="msger-input" placeholder="Enter your message...">
      <button type="submit" class="msger-send-btn">Send</button>
    </div>
</section>      
        `;
    }
    loadTargetElements() {
        this.model =  new TableModel();
        this.loadInputs();
        this.button = this.getElements('button.save')[0];
        this.selectType = this.getElements('select[name=docType]')[0];

    }
    attachAttributesNLogic() {
        this.inputListener();
        this.addButtonClickEvent();
        this.selectTypeEvent();
    }
    addButtonClickEvent() {
        this.button.onclick = () => {
            // console.log(this.model);
            this.model.date = Date.now();
            this.model.id = uuid().toLowerCase();
            win.saveInput = new CustomEvent('addToDatabase', {detail: {model:this.model, dataKey:'template'}});
            win.dispatchEvent(win.saveInput);
            navigate('templates');
        }
    }
    selectTypeEvent() {
        this.selectType.onchange = (event) => {
            this.model.docType = event.target.value;
        }

    }
}
