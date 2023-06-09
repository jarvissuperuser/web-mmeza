import {addDepScript} from "../core/abstraction.js";
import {env} from './env.js'
// import 'firebase/firebase-app'


export const load = () => {
    addDepScript(env.paths.app);
    addDepScript(env.paths.auth);
    addDepScript(env.paths.storage);
    addDepScript(env.paths.firestore);
}

export const initFireBase = (firebase) => {
    try{
        if(!env.prod) {
            firebase.initializeApp(env.local.keys);
            firebase.auth().useEmulator(env.local.keys.authDomain);
            firebase.firestore().useEmulator(env.local.keys.fire.host, env.local.keys.fire.port);
            firebase.storage().useEmulator(
                env.local.keys.storage.host,
                env.local.keys.storage.port
            );
        } else {
            firebase.initializeApp(env.setting);
        }
        window.fire = new Fire(firebase);
    }catch (e) {
        console.debug(e);
    }

}

export class Fire {
    constructor(firebase) {
        if (firebase) {
            this.auth = firebase.auth();
            this.db = firebase.firestore();
            this.store = firebase.storage();
            this.firebase = firebase;
        }
    }
    persist(persistence) {
        return this.auth.setPersistence(persistence);
    }
}
