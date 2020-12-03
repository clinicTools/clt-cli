import calc from './calcPlatformComponent'

import android from "./android/Label"
import darwin from "./ios/Label"
import ios from "./ios/Label"
import win32 from "./win32/Label"

export default calc(android, darwin, ios, win32)