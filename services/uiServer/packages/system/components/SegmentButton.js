import calc from './calcPlatformComponent'

import android from "./android/SegmentButton"
import darwin from "./ios/SegmentButton"
import ios from "./ios/SegmentButton"
import win32 from "./win32/SegmentButton"

export default calc(android, darwin, ios, win32)