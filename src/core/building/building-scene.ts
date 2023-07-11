import * as OBC from "openbim-components"

export class BuildingScene {
    components: OBC.Components;

    constructor(container: HTMLDivElement) {
        this.components = new OBC.Components();

        const scene = new OBC.SimpleScene(this.components);
        scene.get().background = null;

        this.components.scene = scene;
        this.components.renderer = new OBC.SimpleRenderer(
            this.components,
            container
        )

        this.components.camera = new OBC.SimpleCamera(this.components)
        this.components.init()

        const grid = new OBC.SimpleGrid(this.components)
        this.components.tools.add(grid)
    }

    dispose() {
        this.components.dispose();
        (this.components as any) = null;
    }
}