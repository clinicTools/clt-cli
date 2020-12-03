import calc from './calcPlatformComponent'

import android from "./android/Title"
import darwin from "./ios/Title"
import ios from "./ios/Title"
import win32 from "./win32/Title"

export default calc(android, darwin, ios, win32)