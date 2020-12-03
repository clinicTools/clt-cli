import { Socket } from "./internals/socket"
import { DataBinding } from "./DataBinding"

let settings = {

}

export class User {
    static async login(username, password, loginType) {
        return await Socket.connect({
            username,
            password,
            type: loginType
        })
    }
    static async logout() {
        window.location.reload();
    }
    static get language() {
        return "de-ch";
    }
    static get Settings() {
        return Settings
    }
}

class Settings {
    static async set(key, value) {
        let db = new DataBinding("system/UserSettings");
        await db.start();
        let result = await db.save({
            key,
            value
        });
        db.stop();
        settings[key] = value
    }
    static async get(key) {
        if(!settings[key]) {
            let db = new DataBinding("system/UserSettings", {"_key": key});
            await db.start();
            if(db.recordset.length > 0) {
                settings[key] = db.recordset[0].value   
            }
            db.stop();
        }
        return settings[key]
    }
}