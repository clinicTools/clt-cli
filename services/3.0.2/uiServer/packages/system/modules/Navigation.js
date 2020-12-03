import createApp from './internals/vueCreateApp'

let navigation = document.getElementById('navigation');
let menu = document.querySelector('ion-menu');
navigation.addEventListener("ionNavWillChange", async (e) => {
        //await Detail.view("_default.js")
});

let rootLoaded = false;
export class Navigation {
    static async push(component, options) {
        let d = component.data()
        d.options = options;
        component.data = function() {
            return d;
        }

        let app = createApp(component);
        
        if(rootLoaded === true) {
            await navigation.push("clt-menu", {app});
            return;
        }
        navigation.querySelector("clt-menu").setContent(app);
        rootLoaded = true;
    }
    static async pop() {
        await navigation.pop()
    }
    static get swipeGesture() {
        return menu.swipeGesture;
    }
    static set swipeGesture(value) {
        menu.swipeGesture = value;
    }
    static async isOpen() {
        return await menu.isOpen()
    }
    static async open() {
        return await menu.open()
    }
    static async close() {
        return await menu.close()
    }
}