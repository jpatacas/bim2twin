import { BuildingScene } from "./building-scene";

export const buildingHandler = {
    viewer: null as BuildingScene | null,

    start(container: HTMLDivElement) {
        if (!this.viewer) {
            this.viewer = new BuildingScene(container);
        }
    },

    remove() {
        if (this.viewer) {
            console.log("building viewer removed!");
            this.viewer.dispose();
            this.viewer = null;
        }
    }
}