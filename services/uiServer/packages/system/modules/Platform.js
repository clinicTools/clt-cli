export class Platform {
    static get os() {
        return class Os {
            static get win32() {
                return document.body.classList.contains("win32");
            }
            static get android() {
                return document.querySelector("ion-app").classList.contains("md") && !document.body.classList.contains("win32");
            }
            static get ios() {
                return document.querySelector("ion-app").classList.contains("ios") && !document.body.classList.contains("win32");
            }
            static get darwin() {
                return false;
            }
        }
    }

    static get type() {
        return class PlatformType {
            static get mobile() {
                return false;
            }
            static get tablet() {
                return false;
            }
            static get desktop() {
                return false;
            }
            static get web() {
                return false;
            }
        }
    }
}