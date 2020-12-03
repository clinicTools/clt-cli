import calc from './calcPlatformComponent'

import android from "./android/Buttons"
import darwin from "./ios/Buttons"
import ios from "./ios/Buttons"
import win32 from "./win32/Buttons"

export default calc(android, darwin, ios, win32)