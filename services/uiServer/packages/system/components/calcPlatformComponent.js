import { getPlatforms } from "@ionic/core"
let plt = getPlatforms()

export default function(android, darwin, ios, win32) {
    return plt.includes("desktop") ? win32 : plt.includes("ios") ? ios : android
}