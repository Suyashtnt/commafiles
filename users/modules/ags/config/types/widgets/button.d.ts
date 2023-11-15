import "../gtk-types/gtk-3.0-ambient.js";
import "../gtk-types/gdk-3.0-ambient.js";
import "../gtk-types/cairo-1.0-ambient.js";
import "../gtk-types/gnomebluetooth-3.0-ambient.js";
import "../gtk-types/dbusmenugtk3-0.4-ambient.js";
import "../gtk-types/gobject-2.0-ambient.js";
import "../gtk-types/nm-1.0-ambient.js";
import "../gtk-types/soup-3.0-ambient.js";
import "../gtk-types/gvc-1.0-ambient.js";
import Gtk from 'gi://Gtk?version=3.0';
import type GtkTypes from "../gtk-types/gtk-3.0.js";
import { type Command } from './widget.js';
export interface ButtonProps extends GtkTypes.Button.ConstructorProperties {
    onClicked?: Command;
    onPrimaryClick?: Command;
    onSecondaryClick?: Command;
    onMiddleClick?: Command;
    onPrimaryClickRelease?: Command;
    onSecondaryClickRelease?: Command;
    onMiddleClickRelease?: Command;
    onHover?: Command;
    onHoverLost?: Command;
    onScrollUp?: Command;
    onScrollDown?: Command;
}
export default class AgsButton extends Gtk.Button {
    onClicked: Command;
    onPrimaryClick: Command;
    onSecondaryClick: Command;
    onMiddleClick: Command;
    onPrimaryClickRelease: Command;
    onSecondaryClickRelease: Command;
    onMiddleClickRelease: Command;
    onHover: Command;
    onHoverLost: Command;
    onScrollUp: Command;
    onScrollDown: Command;
    constructor({ onClicked, onPrimaryClick, onSecondaryClick, onMiddleClick, onPrimaryClickRelease, onSecondaryClickRelease, onMiddleClickRelease, onHover, onHoverLost, onScrollUp, onScrollDown, ...rest }?: ButtonProps);
}
