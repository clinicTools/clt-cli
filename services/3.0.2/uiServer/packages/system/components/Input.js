import calc from './calcPlatformComponent'

import android from "./android/Input"
import darwin from "./ios/Input"
import ios from "./ios/Input"
import win32 from "./win32/Input"

export default calc(android, darwin, ios, win32)