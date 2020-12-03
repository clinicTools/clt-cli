import index from "./src/index"
import "@ionic/core/css/ionic.bundle.css"
import { IonicVue } from "@ionic/vue"

IonicVue.install().then(() => {
    index();
});

window.customElements.define('clt-menu', class Menu extends HTMLElement {
    setContent(app) {
        this.app = app;
        this.connectedCallback();
    }

    connectedCallback() {
        if(!this.app) {
            return;
        }
        this.vm = this.app.mount(this);
    }

    disconnectedCallback() {
        this.app.unmount();
    }
});
window.customElements.define("clt-detail", class Detail extends HTMLElement {
    connectedCallback() {
    }
});
window.customElements.define('clt-modal', class Modal extends HTMLElement {
    connectedCallback() {
        this.vm = this.app.mount(this);
    }
    disconnectedCallback() {
        this.app.unmount();
    }
});
window.customElements.define('clt-popover', class PopOver extends HTMLElement {
    connectedCallback() {
        this.vm = this.app.mount(this);
    }
    disconnectedCallback() {
        this.app.unmount();
    }
});