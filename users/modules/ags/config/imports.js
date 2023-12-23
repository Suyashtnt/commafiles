import * as Utils from "resource:///com/github/Aylur/ags/utils.js";

export { default as Gtk } from "gi://Gtk";
export { default as GLib } from "gi://GLib";
export { default as Gdk } from "gi://Gdk";
export { default as GObject } from "gi://GObject";
export { default as Vte } from "gi://Vte";

export {
  Box,
  Button,
  Calendar,
  CenterBox,
  default as Widget,
  Entry,
  EventBox,
  Icon,
  Label,
  ProgressBar,
  Revealer,
  Scrollable,
  Slider,
  Window,
} from "resource:///com/github/Aylur/ags/widget.js";
export { default as AgsWidget } from "resource:///com/github/Aylur/ags/widgets/widget.js";

export { default as Mpris } from "resource:///com/github/Aylur/ags/service/mpris.js";
export { default as Notifications } from "resource:///com/github/Aylur/ags/service/notifications.js";
export { default as Hyprland } from "resource:///com/github/Aylur/ags/service/hyprland.js";
export { default as SystemTray } from "resource:///com/github/Aylur/ags/service/systemtray.js";
export { default as Variable } from "resource:///com/github/Aylur/ags/variable.js";
export { default as Service } from "resource:///com/github/Aylur/ags/service.js";
export { default as Applications } from "resource:///com/github/Aylur/ags/service/applications.js";

export { default as App } from "resource:///com/github/Aylur/ags/app.js";

export { Utils };

export const toCSS = (/** @type {Record<string, any>} */ style) => {
  return Object.entries(style).map(([key, value]) => {
    return `${toKebabCase(key)}: ${value}`;
  }).join(";\n");
};

const toKebabCase = (/** @type {string} */ str) => {
  return str.split("").map((letter, idx) => {
    return letter.toUpperCase() === letter
      ? `${idx !== 0 ? "-" : ""}${letter.toLowerCase()}`
      : letter;
  }).join("");
};
