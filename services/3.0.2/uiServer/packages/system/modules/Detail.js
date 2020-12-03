import createApp from './internals/vueCreateApp'
import { Navigation } from './Navigation'
import defaultView from "@views/detail/_default"

defaultView.name = "cltDetailDefaultView"

let detailVM;
let isDefaultView = false;
export class Detail {
    static async view(component, options = {}) {
        let detail = document.querySelector("#detail>clt-detail");
        
        if(detailVM) {
            detailVM.unmount();
        }

        let d = component.data()
        d.options = options;
        component.data = () => {
            return d;
        }
        
        detailVM = createApp(component);
        
        detailVM.mount(detail);
        if(component.name !== "cltDetailDefaultView") {
            isDefaultView = false;
            if(await Navigation.isOpen()) {
                await Navigation.close();
            }
        }
    }
    static async openDefault() {
        if(isDefaultView === false) {
            isDefaultView = true;
            Detail.view(defaultView)
        }
    }
}