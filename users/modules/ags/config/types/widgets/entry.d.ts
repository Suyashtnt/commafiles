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
import GtkTypes from "../gtk-types/gtk-3.0.js";
import { type Command } from './widget.js';
export interface EntryProps extends GtkTypes.Entry.ConstructorProperties {
    onAccept?: Command;
    onChange?: Command;
}
export default class AgsEntry extends Gtk.Entry {
    onAccept: Command;
    onChange: Command;
    constructor({ onAccept, onChange, ...rest }?: EntryProps);
}