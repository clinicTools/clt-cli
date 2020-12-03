import createApp from './internals/vueCreateApp'
import mitt from "mitt"

let ionApp = document.querySelector("ion-app");
export class PopOver {
    constructor(view, event) {
        this.emitter = new mitt()
        view.methods.emit = (event, data) => {
            this.emitter.emit(event, data)
        }
        this.popover = document.createElement('ion-popover')
        this.popover.component = 'clt-popover';
        this.popover.cssClass = 'all';
        this.popover.translucent = true;
        this.popover.showBackdrop = false;

        let app = createApp(view);
        this.popover.componentProps = {app};
        this.popover.event = event;

        document.body.appendChild(this.popover);
        
    }
    async show() {
            while(this.popover.present === undefined) {
                await new Promise((resolve) => { setTimeout(resolve, 5) })
            }

            this.popover.present();
    }
    close() {
        this.popover.dismiss();
    }
    on(event, cb) {
        this.emitter.on(event, cb)
    }
}