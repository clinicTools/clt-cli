import calc from './calcPlatformComponent'

import android from "./android/Segment"
import darwin from "./ios/Segment"
import ios from "./ios/Segment"
import win32 from "./win32/Segment"

export default calc(android, darwin, ios, win32)