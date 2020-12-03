import calc from './calcPlatformComponent'

import android from "./android/Button"
import darwin from "./ios/Button"
import ios from "./ios/Button"
import win32 from "./win32/Button"

export default calc(android, darwin, ios, win32)