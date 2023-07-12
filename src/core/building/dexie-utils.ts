import {Dexie} from "dexie";

interface IModel {
    id: string;
    file: Blob;
}

export class ModelDatabase extends Dexie {
    models!: Dexie.Table<IModel, number>;

    constructor() {
        super("ModelDatabase");
        this.version(2).stores({
            models:"id, file",
        })
    }
}