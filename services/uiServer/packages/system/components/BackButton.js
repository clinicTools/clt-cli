import calc from './calcPlatformComponent'

import android from "./android/BackButton"
import darwin from "./ios/BackButton"
import ios from "./ios/BackButton"
import win32 from "./win32/BackButton"

export default calc(android, darwin, ios, win32)