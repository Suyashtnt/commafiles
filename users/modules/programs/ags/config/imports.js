/// <reference path="./types/gtk-types/gtk-3.0-ambient.d.ts">
/// <reference path="./types/gtk-types/gdk-3.0-ambient.d.ts">
/// <reference path="./types/gtk-types/cairo-1.0-ambient.d.ts">
/// <reference path="./types/gtk-types/gnomebluetooth-3.0-ambient.d.ts">
/// <reference path="./types/gtk-types/dbusmenugtk3-0.4-ambient.d.ts">
/// <reference path="./types/gtk-types/gobject-2.0-ambient.d.ts">
/// <reference path="./types/gtk-types/nm-1.0-ambient.d.ts">
/// <reference path="./types/gtk-types/gvc-1.0-ambient.d.ts">

/// <reference path="./types/ags.d.ts"/>

import Gtk from 'gi://Gtk?version=3.0';

export {
  Window,
  Box,
  EventBox,
  Slider,
  Label,
  CenterBox,
  Button,
  Scrollable,
  default as Widget,
} from "resource:///com/github/Aylur/ags/widget.js"


export { default as Mpris } from "resource:///com/github/Aylur/ags/service/mpris.js"
export { default as Variable } from "resource:///com/github/Aylur/ags/variable.js"

import { default as App } from "resource:///com/github/Aylur/ags/app.js"
App.connect = (...args) => App.instance.connect(...args);

export * as Utils from "resource:///com/github/Aylur/ags/utils.js"

export { Gtk, App }
