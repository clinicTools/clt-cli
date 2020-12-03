import calc from './calcPlatformComponent'

import android from "./android/Item"
import darwin from "./ios/Item"
import ios from "./ios/Item"
import win32 from "./win32/Item"

export default calc(android, darwin, ios, win32)