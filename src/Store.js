import { EventEmitter } from "events";
import dispatcher from "./Dispatcher";

class AppStore extends EventEmitter {
	constructor() {
		super();
	}

	handleActions(action) {
		switch(action.type) {
			case "SET_WEB3": {
        this.web3 = action.web3;
        this.emit("web3Ready");
        break;
	    }
		}
	}

}

const Store = new AppStore();
dispatcher.register(Store.handleActions.bind(Store));

export default Store;
