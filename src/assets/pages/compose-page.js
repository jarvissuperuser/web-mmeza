import {Core} from '../core/index.js';

export class ComposePage extends Core {
    static get is() {
        return 'compose-page';
    }
    HTMLTemplate() {
        return `
<div class="w3-black vh-100">
    <div class="w3-margin-top-big">
        <div class="w3-center w3-padding">
            <canvas width="1024" height="40" class="w3-green w3-col s12"></canvas>
            <audio controls class="w3-col s12" src="/assets/files/t.wav"></audio>
            <input type="file">
       </div>
    </div>
</div>        
        `;
    }

    loadTargetElements() {
        this.canvas = this.getElements('canvas')[0];
        this.input = this.getElements('input[type=file]')[0];
        /** @var {HTMLAudioElement}*/
        this.audio = this.getElements('audio[controls]')[0];
    }

    attachAttributesNLogic() {

        super.attachAttributesNLogic();
        this.input.onchange = () => this.buildAnalyzer();
        this.samples = 1024;
    }

     async buildAnalyzer() {
        if( this.audio.isConnected) {
            const context =  new AudioContext();
            this.sourceAudio = context.createMediaElementSource(this.audio);
            this.analyzer = context.createAnalyser();
            this.audioData = await context.decodeAudioData(await this.getAudioData(this.sourceAudio.mediaElement.src));
            console.log({data: this.normalizeData(this.filterData(this.audioData.getChannelData(0)))});
        }
    }

    getAudioData = url =>  {
        return fetch(url)
            .then(response =>  response.arrayBuffer())
            .then(arrayBuffer => arrayBuffer)
    }

    filterData = (rawData) => {
        const samples = this.samples; // Number of samples we want to have in our final data set
        const blockSize = Math.floor(rawData.length / samples); // the number of samples in each subdivision
        const filteredData = [];
        for (let i = 0; i < samples; i++) {
            let blockStart = blockSize * i; // the location of the first sample in the block
            let sum = 0;
            for (let j = 0; j < blockSize; j++) {
                sum = sum + Math.abs(rawData[blockStart + j]); // find the sum of all the samples in the block
            }
            filteredData.push(sum / blockSize); // divide the sum by the block size to get the average
        }
        return filteredData;
    }

    normalizeData = filteredData => {
        const multiplier = Math.pow(Math.max(...filteredData), -1);
        return filteredData.map(n => n * multiplier);
    }



}
