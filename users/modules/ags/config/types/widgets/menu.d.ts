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
export interface MenuProps extends GtkTypes.Menu.ConstructorProperties {
    children?: GtkTypes.Widget[];
    onPopup?: Command;
    onMoveScroll?: Command;
}
export declare class AgsMenu extends Gtk.Menu {
    onPopup: Command;
    onMoveScroll: Command;
    constructor({ children, onPopup, onMoveScroll, ...rest }?: MenuProps);
    get children(): InstanceType<typeof Gtk.Widget>[] | null;
    set children(children: InstanceType<typeof Gtk.Widget>[] | null);
}
export interface MenuItemProps extends GtkTypes.Menu.ConstructorProperties {
    onActivate?: Command;
    onSelect?: Command;
    onDeselect?: Command;
}
export declare class AgsMenuItem extends Gtk.MenuItem {
    onActivate: Command;
    onSelect: Command;
    onDeselect: Command;
    constructor({ onActivate, onSelect, onDeselect, ...rest }?: MenuItemProps);
}
