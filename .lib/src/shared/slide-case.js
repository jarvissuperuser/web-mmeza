import { addEl, DOMElement } from '../core/index.js'
import { Analysis } from './models/analysis-model.js';

export class SlideCase extends DOMElement{
    static get is() {return `slide-case`};
    HTML() {
    return `<div class="w3-col s12 vh-100 bg-theme w3-grid">
    <div class="vh-100">
        <div class="w3-col s12 w3-padding w3-grid place-center ">Technical Page</div>
        <div class="w3-col s12">
            <div class="w3-padding">
               <div class="w3-col s12"> 
                    <div class="w3-third w3-padding w3-right"><img src="assets/img/invasives.png" alt="Durban Invasives" class="w3-image"></div>
                    <div class="w3-twothird w3-padding">
                        <h3>Project: Durban Invasives</h3>
                        <p>Summary: Durban Municipality's Environmental Conservation team to control alien invasive species needed a rewrite of their web tool in a web technologies that are easier to support. </p>
                        <div class="w3-col s12 m6">
                            <h5>Key Features</h5>
                            <ul>
                                <li>Authentication</li>
                                <li>Registration, Tracking with coordinates, Logging and management on invasive plant species</li>
                                <li>    history of events of invasive species</li>
                            </ul>
                        </div>
                        <div class="w3-col s12 m6">
                        <h5>Objectives</h5>
                        <ul>
                            <li>Convert Drupal application to dotnet application</li>
                            <li>migrate data from drupal to dotnet MySQL database</li>
                            <li>Modernise Application</li>
                        </ul>
                        </div>
                    </div>
                </div>
                <div class="w3-col s12 w3-padding">
                    <div class="w3-col s12">
                        <div class="w3-col s12 m8">
                            <h5>Implementation</h5>
                            <ol>
                                <li><details><summary>Discovery</summary>
                                    <ul>
                                        <li>screen shot old interface</li>
                                        <li>explore data in data schema</li>
                                    </ul>
                                    </details>
                                </li>
                                <li><details><summary>Build Application</summary>
                                    <ul>
                                        <li>implement interface in Angular Framework</li>
                                        <li>Implement backend in dotnet, future-proof by adding REST API for possible mobile application development</li>
                                        <li>Set up routing endpoints for app to be accessible over the internet while hosted on internal servers</li>
                                    </ul>
                                    </details>
                                </li>
                                <li><details><summary>Data Migration</summary>
                                    <ul>
                                        <li>Setup Data analysis tool [Metabase]</li>
                                        <li>Extract data to analysis tool</li>
                                        <li>Transform and Map data to destination database</li>
                                        <li>Load mapped data into destination database </li>
                                    </ul></details>
                                </li>
                                <li><details><summary>Reporting to all stake holders</summary>
                                    <ul>
                                        <li>Prepare Documentation to support new software</li>
                                        <li>Engage network infrastructure for access rules</li>
                                        <li>Engage Cyber security team for ensure application meets security requirements</li>
                                        <li>On board and demonstrate app capabilities to all key stakeholders</li>
                                    </ul></details>
                                </li>
                            </ol>
                        </div>
                        <div class="w3-col s12 m4 cover w3-padding">
                            <span class="brdr"></span><span class="brdr"></span><span class="brdr"></span><span class="brdr"></span>
                            <h5>Value Propositions</h5>
                            <ol>
                                <li>GPS Coordinates captured from uploaded images of invasive species</li>
                                <li>World class Authentication with bespoke Identity Server</li>
                            </ol>
                        </div>
                        <div class="w3-col s12">
                            <h5>Outcomes</h5>
                            <p>The Application was successfully deployed. The application was secure from launch. The application out-performed its predecessor in some metrics</p>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    </div>
</div>`;
    }

    /**
    * @property {HTMLElement} project
    * @property {HTMLImageElement} image
    * @property {HTMLElement} summary
    * @property {HTMLElement} keyFeatures
    * @property {HTMLElement} objectives
    */
    loadTargetElements() {
        if (!this.model) {
            this.model = new Analysis();
        }
        this.project = this.byId('h3');
        this.image = this.byId('img');
        this.summary = this.byId('p');
        this.keyFeatures = this.byId('ul');
        this.objectives = this.getElements('ul')[1];
        this.implementationWrapper = this.getElements('ol')[0];
        this.valueProposition = this.getElements('ol')[1];
        this.implementationDetailTemplate = this.getElements('li');
        this.outcome = this.getElements('p')[1];
    }
    attachAttributesNLogic() {
        this.loadData();
    }

    loadData() {
        if (!this.model.id) return;
        this.project.innerText = this.model.project;
        this.summary.innerText = this.model.summary;
        this.image.src = this.model.src;
        this.outcome.innerText = this.model.outcomes;
        this.keyFeatures.innerHTML = '';
        this.objectives.innerHTML = '';
        this.implementationWrapper.innerHTML = '';
        const lit = addEl('li');
        this.model.features.forEach(f => {
            const li = lit.cloneNode(true); 
            li.innerText = f;
            this.keyFeatures.appendChild(li);
        })
        this.model.objectives.forEach(o => {
            const li = lit.cloneNode(true); 
            li.innerText = o;
            this.objectives.appendChild(li);
        })
        this.model.implementation.forEach(i => {
            const li = lit.cloneNode(true); 
            const detail = addEl('details');
            const summary = addEl('summary');
            const details = addEl('ul');
            i.details.forEach(d => {
                const lii = lit.cloneNode(true);
                lii.innerText = d;
                details.appendChild(lii);
            })
            summary.innerText = i.summary;
            summary.title = 'see details';
            detail.appendChild(summary);
            detail.appendChild(details);
            li.appendChild(detail);
            this.implementationWrapper.appendChild(li);
        })
        if (!!this.model.valueProposition){
            this.valueProposition.innerHTML = '';
            this.model.valueProposition.forEach(v => {
                const li = lit.cloneNode(true);
                li.innerText = v;
                this.valueProposition.appendChild(li);
            });
        }
    }

}
