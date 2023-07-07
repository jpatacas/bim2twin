import { ActionType , Action} from "./actions"

export class Events {
    private list: {[type:string]: Function[]} = {}

    on(type: ActionType, callback: Function) {
        if (!this.list[type]) {
            this.list[type] = [];
        }
        this.list[type].push(callback);
    }

    trigger(action: Action) {
        if(!this.list[action.type]) {
            return;
        }

        for (const event of this.list[action.type]) {
            event(action.payload)
        }
    }
}