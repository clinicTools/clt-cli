import calc from './calcPlatformComponent'

import android from "./android/SkeletonText"
import darwin from "./ios/SkeletonText"
import ios from "./ios/SkeletonText"
import win32 from "./win32/SkeletonText"

export default calc(android, darwin, ios, win32)