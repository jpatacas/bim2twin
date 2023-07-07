import { MapScene } from "./map-scene";
import { User } from "firebase/auth";

export const mapHandler = {

    viewer: null as MapScene | null,

    start(container: HTMLDivElement) {
        if(!this.viewer) {

            console.log("Map started!")
            this.viewer = new MapScene(container)
        }
    },
    remove() {
        if (this.viewer) {

            console.log("Map removed!")
            this.viewer.dispose();
            this.viewer = null;
        }
    },

    addBuilding(user: User) {
        if (this.viewer) {
            this.viewer.addBuilding(user)
        }
    }
}