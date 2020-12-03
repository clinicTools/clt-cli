import calc from './calcPlatformComponent'

import android from "./android/Toolbar"
import darwin from "./ios/Toolbar"
import ios from "./ios/Toolbar"
import win32 from "./win32/Toolbar"

export default calc(android, darwin, ios, win32)