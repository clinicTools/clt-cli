import calc from './calcPlatformComponent'

import android from "./android/Card"
import darwin from "./ios/Card"
import ios from "./ios/Card"
import win32 from "./win32/Card"

export default calc(android, darwin, ios, win32)