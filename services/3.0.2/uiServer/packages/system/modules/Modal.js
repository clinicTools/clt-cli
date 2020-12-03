import createApp from './internals/vueCreateApp'
import mitt from "mitt"

let ionApp = document.querySelector("ion-app");
export class Modal {
    constructor(view) {
        //console.warn("DEPRECATED (clt): system.Modal is no longer supported and will be removed in next major version. Please use the ViewModel 'Modal'.")
        this.emitter = new mitt()
        if(!view.methods) {
            view.methods = {};
        }
        view.methods.emit = (event, data) => {
            this.emitter.emit(event, data)
        }
        this.modal = document.createElement('ion-modal')
        this.modal.component = 'clt-modal';
        
        let app = createApp(view);
        this.modal.componentProps = {app};
        this.modal.backdropDismiss = true;
        this.modal.swipeToClose = true;
        this.modal.showBackdrop = false;
        this.modal.presentingElement = ionApp;
        document.body.appendChild(this.modal);
        
    }
    async show() {
            while(this.modal.present === undefined) {
                await new Promise((resolve) => { setTimeout(resolve, 5) })
            }

            this.modal.present();
            
            try {
                await Capacitor.Plugins.StatusBar.setStyle({ style: "DARK" });
            } catch {}
            await this.modal.onWillDismiss();
            try {
                if(!window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    await Capacitor.Plugins.StatusBar.setStyle({ style: "LIGHT" });
                }
            } catch {}
    }
    close() {
        this.modal.dismiss();
    }
    on(event, cb) {
        this.emitter.on(event, cb)
    }
}