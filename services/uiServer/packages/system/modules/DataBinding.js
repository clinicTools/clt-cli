import { Socket, RoomStore } from "./internals/socket";

export class DataBinding {
    constructor(table, filter = {}) {
        this.table = table;
        this.filter = filter;
        this.room = ""
        this.recordset = [];
    }
    start() {
        return new Promise(async (resolve, reject) => {
            let data = await Socket.emit("load", {
                table: this.table,
                filter: this.filter
            });

            if(data.err) {
                reject(data.err);
                return;
            }
            this.recordset = data.recordset
            if(data.recordset[0]) {
                this.value = data.recordset[0]
            } else {
                this.value = {}
            }
            this._room = data.room;
            RoomStore.add(data.room, this);
            resolve();
        });
    }
    async stop() {
        await RoomStore.remove(this._room, this);
    }
    async save(obj) {
        let data = await Socket.emit("save", {
            table: this.table,
            obj: obj
        });
        return data;
    }
}