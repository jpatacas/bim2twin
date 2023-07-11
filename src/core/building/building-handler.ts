import { BuildingScene } from "./building-scene";
import { Building } from "../../types";

export const buildingHandler = {
    viewer: null as BuildingScene | null,

    start(container: HTMLDivElement, building: Building) {
        if (!this.viewer) {
            this.viewer = new BuildingScene(container, building);
        }
    },

    remove() {
        if (this.viewer) {
            console.log("building viewer removed!");
            this.viewer.dispose();
            this.viewer = null;
        }
    },

    async convertIfcToFragments(ifc: File) {
        if (!this.viewer) {
            throw new Error("Building viewer is not active!")
        }
        return this.viewer.convertIfcToFragments(ifc)
    }
}