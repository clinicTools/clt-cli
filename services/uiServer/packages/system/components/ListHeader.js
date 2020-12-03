import calc from './calcPlatformComponent'

import android from "./android/ListHeader"
import darwin from "./ios/ListHeader"
import ios from "./ios/ListHeader"
import win32 from "./win32/ListHeader"

export default calc(android, darwin, ios, win32)