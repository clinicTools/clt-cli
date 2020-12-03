export class Storage {
    static get Class() { return StorageClass }
    static subscripe(room) {}  
    static query(query) { return [] }  
    static buildClass(c) {
        c.load = function(options) {
            alert("");
        }
        return c;
    }
} 

class StorageClass {
    constructor() {
        
    }
    save() {
        console.log("save")
    }
    delete() {
        console.log("delete")
    }
}