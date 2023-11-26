export { default as Gtk } from 'gi://Gtk';
export { default as GLib }  from 'gi://GLib';
export { default as GObject }  from 'gi://GObject';

export {
  Window,
  Box,
  EventBox,
  Slider,
  ProgressBar,
  Label,
  CenterBox,
  Button,
  Scrollable,
  Icon,
  Revealer,
  Calendar,
  default as Widget,
} from "resource:///com/github/Aylur/ags/widget.js"
export { default as AgsWidget } from "resource:///com/github/Aylur/ags/widgets/widget.js"

export { default as Mpris } from "resource:///com/github/Aylur/ags/service/mpris.js"
export { default as Notifications } from "resource:///com/github/Aylur/ags/service/notifications.js"
export { default as Hyprland } from "resource:///com/github/Aylur/ags/service/hyprland.js"
export { default as SystemTray } from "resource:///com/github/Aylur/ags/service/systemtray.js"
export { default as Variable } from "resource:///com/github/Aylur/ags/variable.js"
export { default as Service } from "resource:///com/github/Aylur/ags/service.js"

export { default as App } from "resource:///com/github/Aylur/ags/app.js"

import * as Utils from "resource:///com/github/Aylur/ags/utils.js"
export { Utils }

export const toCSS = (/** @type {Record<string, any>} */ style) => {
  return Object.entries(style).map(([key, value]) => {
    return `${toKebabCase(key)}: ${value}`;
  }).join(';\n');
}

const toKebabCase = (/** @type {string} */ str) => {
   return str.split('').map((letter, idx) => {
     return letter.toUpperCase() === letter
      ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
      : letter;
   }).join('');
}
