import nacl from "tweetnacl"
import naclUtil from "tweetnacl-util"

const serverSecretKey = new Uint8Array([236, 19, 104, 175, 160, 226, 76, 146, 104, 53, 27, 213, 127, 162, 155, 38, 214, 72, 111, 75, 119, 10, 167, 138, 222, 155, 15, 2, 251, 122, 63, 212]);
//const serverPublicKey = new Uint8Array([124, 229, 50, 134, 99, 83, 58, 164, 198, 232, 19, 40, 226, 37, 41, 154, 45, 148, 248, 152, 147, 251, 88, 3, 137, 22, 111, 242, 229, 229, 51, 49]);

const newClientPublicKey = new Uint8Array([79, 28, 151, 166, 248, 232, 209, 142, 120, 20, 89, 220, 150, 250, 173, 236, 242, 247, 75, 119, 53, 45, 249, 150, 101, 75, 182, 213, 231, 108, 37, 52]);
//const newClientSecretKey = new Uint32Array([152, 242,  18, 184, 118, 187, 164, 134, 158,  65, 179, 209, 141,  71, 174, 136, 228,  83,  81, 119,  84, 197, 156, 193, 95, 254,  39, 223, 236,  90,  30,  88])
const newClientSharedKey = nacl.box.before(newClientPublicKey, serverSecretKey);


let express = require('express');
let app = express();
let WebSocket = require('ws');
let server = require('http').createServer(app);
let wss = new WebSocket.Server({ server });

let querys = [];
let getQuery = async (name) => {
    if(!querys[name]) {
        querys[name] = new (await import(__dirname + "/src/data/" + name + ".js")).default;
    }
    return querys[name];
}
/*wss.clients.forEach(function (client) {
    if (client.readyState === WebSocket.OPEN && rooms.some(room => { client.rooms.includes(room) })) {
        sendMessage(client, message)
    }
});*/
wss.on('connection', function(ws) {
    ws.authenticated = false;

    ws.onmessage = async (data) => {
        let cryptedMessage = JSON.parse(data.data);
        let message = JSON.parse(naclUtil.encodeUTF8(
            nacl.box.open.after(naclUtil.decodeBase64(cryptedMessage.message), naclUtil.decodeBase64(cryptedMessage.nonce), (ws.sharedKey || newClientSharedKey))
        ))

        if(message.type == "login") {
            ws.sharedKey = nacl.box.before(new Uint8Array(Object.values(message.data.publicKey)), serverSecretKey) 
            let result = await (await import(__dirname + "/src/data/system/authenticate.js")).default(message.data, ws)
            if(result === true) {
                ws.authenticated = true;
                ws.rooms = [];
            }
            sendMessage(ws, {
                id: message.id,
                type: "answer",
                data: result
            });

        } else if (message.type == "load") {
            let result = await (await getQuery(message.data.table)).load(message.data.filter, ws);
            if(result.rooms) {
                ws.rooms.push(result.rooms);
            }
            return sendMessage(ws, {
                id: message.id,
                type: "answer",
                data: result
            });

        } else if (message.type == "save") {
            let result = await (await getQuery(message.data.table)).save(message.data.obj, ws)
            return sendMessage(ws, {
                id: message.id,
                type: "answer",
                data: result
            });
        } else if (message.type == "delete") {   
            let result = await (await getQuery(message.data.table)).delete(message.data.obj, ws)
            return sendMessage(ws, {
                id: message.id,
                type: "answer",
                data: result
            });
        }
    }
});
server.listen(82);
console.log("Server is running on Port 82")

function sendMessage(ws, message) {
    let m = JSON.stringify(message)
    m = naclUtil.decodeUTF8(m);
    let nonce = nacl.randomBytes(nacl.box.nonceLength)
    let cryptedMessage = nacl.box.after(m, nonce, ws.sharedKey)
    let newMessage = JSON.stringify({
        nonce: naclUtil.encodeBase64(nonce),
        message: naclUtil.encodeBase64(cryptedMessage),
    }) 
    ws.send(newMessage)
}