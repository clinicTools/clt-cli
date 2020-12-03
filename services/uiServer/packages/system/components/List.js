import calc from './calcPlatformComponent'

import android from "./android/List"
import darwin from "./ios/List"
import ios from "./ios/List"
import win32 from "./win32/List"

export default calc(android, darwin, ios, win32)