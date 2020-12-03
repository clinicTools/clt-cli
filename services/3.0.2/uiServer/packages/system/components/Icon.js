import calc from './calcPlatformComponent'

import android from "./android/Icon"
import darwin from "./ios/Icon"
import ios from "./ios/Icon"
import win32 from "./win32/Icon"

import * as icons from 'ionicons/icons';
import { addIcons } from "ionicons"

export default calc(android, darwin, ios, win32)


addIcons({
    'cog-win32': icons.cogSharp,
    'menu-win32': icons.menuSharp,
    'logout-win32': icons.logOutSharp,
    'arrow-back-win32': icons.arrowBackSharp,
    'chevron-forward-win32': icons.chevronForwardSharp,
    'resize-win32': icons.resizeSharp,
    'remove-circle-win32': icons.removeCircle,
    'options-win32': icons.ellipsisHorizontalSharp,
    'login-win32': icons.logInSharp,
    'add-win32': icons.addSharp,
    'checkmark-win32': icons.checkmarkSharp,
    'close-win32': icons.closeSharp
});

addIcons({
    'cog-ios': icons.cog,
    'menu-ios': icons.menu,
    'logout-ios': icons.logOutOutline,
    'arrow-back-ios': icons.arrowBackSharp,
    'chevron-forward-ios': icons.chevronForward,
    'resize-ios': icons.resize,
    'remove-circle-ios': icons.removeCircle,
    'options-ios': icons.ellipsisHorizontalCircle,
    'login-ios': icons.logInSharp,
    'add-ios': icons.add,
    'checkmark-ios': icons.checkmark,
    'close-ios': icons.close
})