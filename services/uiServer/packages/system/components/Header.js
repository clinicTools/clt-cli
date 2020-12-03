import calc from './calcPlatformComponent'

import android from "./android/Header"
import darwin from "./ios/Header"
import ios from "./ios/Header"
import win32 from "./win32/Header"

export default calc(android, darwin, ios, win32)