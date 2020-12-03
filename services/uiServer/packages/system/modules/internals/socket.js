//import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import * as nacl from 'tweetnacl';
import * as naclUtil from 'tweetnacl-util';

const serverPublicKey = new Uint8Array([124, 229, 50, 134, 99, 83, 58, 164, 198, 232, 19, 40, 226, 37, 41, 154, 45, 148, 248, 152, 147, 251, 88, 3, 137, 22, 111, 242, 229, 229, 51, 49]);
const newClientSecretKey = new Uint8Array([152, 242, 18, 184, 118, 187, 164, 134, 158, 65, 179, 209, 141, 71, 174, 136, 228, 83, 81, 119, 84, 197, 156, 193, 95, 254, 39, 223, 236, 90, 30, 88]);
const clientKeys = nacl.box.keyPair();
const sharedKey = nacl.box.before(serverPublicKey, clientKeys.secretKey)

let socket;
let requests = [];

let socketServer = "macbook-pro.fritz.box"
let socketPort = 82


function message(data) {
    let cryptedMessage = JSON.parse(data.data);

    let message = JSON.parse(naclUtil.encodeUTF8(
            nacl.box.open.after(naclUtil.decodeBase64(cryptedMessage.message), naclUtil.decodeBase64(cryptedMessage.nonce), sharedKey)
    ))
    
    //let message = JSON.parse(data.data);
    if(message.type === "answer") {
        let i = requests.map((e) => { return e.id; }).indexOf(message.id);
        if(i >= 0) {
            requests[i].cb(message.data)
            requests.splice(i, 1);
        }
    } else if(message.type == "change") {
        let data = message.data
        let dbs = RoomStore.stores[data.room];
        if(data.new_val && !data.old_val) {
            for(let i = 0; i < dbs.length; i++) {
                let db = dbs[i];
                db.recordset.push(data.new_val);
            }
            return;
        }
        if(!data.new_val && data.old_val) {
            for(let i = 0; i < dbs.length; i++) {
                let db = dbs[i];
                let index = db.recordset.findIndex(x => x.id === data.old_val.id);
                if (index > -1) {
                    db.recordset.splice(index, 1);
                }
            }
            return;
        }
        if(data.new_val && data.old_val) {
            for(let i = 0; i < dbs.length; i++) {
                let db = dbs[i];
                let index = db.recordset.findIndex(x => x.id === data.new_val.id);
                if (index > -1) {
                    db.recordset.splice(index, 1, data.new_val);
                }
            }
            return;
        }
    } else {
        throw new Error("Unkown message.type: " + data.data)
    }
}

export class Socket {
    static set server(value) {
        socketServer = value
    }
    static get server() {
        return socketServer
    }
    static set port(value) {
        socketPort = value
    }
    static get port() {
        return socketPort
    }
    static connect(options = {}) {
        return new Promise((resolve) => {
            socket = new WebSocket(`ws://${socketServer}:${socketPort}`);
            socket.onmessage = message
            socket.onopen = async () => {
                let result = await Socket.emit("login", { 
                    username: options.username, 
                    password: options.password,
                    type: (options.type || "password"),
                    publicKey: clientKeys.publicKey
                });
                resolve(result);
            }

            socket.onclose = function(e) {
                console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
                setTimeout(() => {
                    Socket.connect(options)
                }, 1000);
            }
            
            socket.onerror = function(err) {
                console.error('Socket encountered error: ', err.message, 'Closing socket');
                socket.close();
            }
        });
    }
    static async emit(type, data) {
        return new Promise((resolve) => {
            let id = uuidv4()
            let message = {
                id,
                type,
                data
            }
            message = JSON.stringify(message)
            message = naclUtil.decodeUTF8(message);
            let nonce = nacl.randomBytes(nacl.box.nonceLength)
            let cryptedMessage;
            if(type === "login") {
                cryptedMessage = nacl.box(message, nonce, serverPublicKey, newClientSecretKey) 
            } else {
                cryptedMessage = nacl.box.after(message, nonce, sharedKey) 
            }
            let newMessage = JSON.stringify({
                nonce: naclUtil.encodeBase64(nonce),
                message: naclUtil.encodeBase64(cryptedMessage),
            })
            socket.send(newMessage);
            requests.push({
                id,
                cb: resolve
            })
        })
    }
}

export class RoomStore {
    static add(room, obj) {
        if(!this.stores) {
            this.stores = {

            }
        }
        if(!this.stores[room]) {
            this.stores[room] = []
        }
        this.stores[room].push(obj);
    }
    static remove(room, obj) {
        console.log(room)
        let i = this.stores[room].indexOf(obj);
        if (i > -1) {
            this.stores[room].splice(i, 1);
        }
        if(this.stores[room].length == 0) {
            delete this.stores[room];
            Socket.emit("leave", {room: room});
        }
    }
}