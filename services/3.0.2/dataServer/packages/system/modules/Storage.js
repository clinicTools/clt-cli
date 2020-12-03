let { Database, aql } = require('arangojs')
let db = new Database({
    url: "http://root:2bfree@localhost:8529",
    databaseName: "clt"
});

export class Storage {
    static get Class() { return StorageClass }
    static get Result() { return StorageResult }
    static get queryBuilder() {return aql }
    static get needs() { return {table: () => {}, index: () => {}}}
    static async query(q) {
        return await db.query(q);
    }
}

class StorageClass {
    async save(coll, doc) {
        try {
            let collection = db.collection(coll);
            let r = await Storage.query(aql`
                INSERT ${doc}
                IN ${collection}
                OPTIONS { overwrite: true }
                RETURN {oldObj: OLD, newObj: NEW}
            `);
            for await(let row of r) {
                console.log(row)
            }
            return true;
        } catch {
            return false;
        }
    }
    async delete(coll, obj) {
        try {
            let collection = db.collection(coll);
            let r = await Storage.query(aql`
                REMOVE ${obj._key} IN ${collection}
                RETURN {old: OLD}
            `);
            for await(let row of r) {
                console.log(row)
            }
            return true;
        } catch {
            return false;
        }
    }
    async load(options) {
        return {
            err: true,
            message: "Unkown filter expression " + JSON.stringify(options)
        }
    }
}

class StorageResult {
    constructor(options) {
        this.rooms = options.rooms;
        this.recordset = options.recordset;
    }
}






    /*
    let exists = await db.collection('Persons').exists();
    if(exists === false) {
        await db.collection('Persons').create();
    }
    exists = await db.collection('Cases').exists();
    if(exists === false) {
        await db.collection('Cases').create();
    }*/
    
    