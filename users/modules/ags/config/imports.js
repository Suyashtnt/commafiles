export { default as Gtk } from 'gi://Gtk?version=3.0';
export { default as GLib }  from 'gi://GLib';

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
  default as Widget,
} from "resource:///com/github/Aylur/ags/widget.js"

export { default as Mpris } from "resource:///com/github/Aylur/ags/service/mpris.js"
export { default as Notifications } from "resource:///com/github/Aylur/ags/service/notifications.js"
export { default as Hyprland } from "resource:///com/github/Aylur/ags/service/hyprland.js"
export { default as SystemTray } from "resource:///com/github/Aylur/ags/service/systemtray.js"
export { default as Variable } from "resource:///com/github/Aylur/ags/variable.js"

import { default as App } from "resource:///com/github/Aylur/ags/app.js"
App.connect = (...args) => App.instance.connect(...args);

export * as Utils from "resource:///com/github/Aylur/ags/utils.js"

export { App }
