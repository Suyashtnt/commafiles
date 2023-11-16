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
import AgsBox from './box.js';
export interface CenterBoxProps extends GtkTypes.Box.ConstructorProperties {
    children?: GtkTypes.Widget[];
    start_widget?: GtkTypes.Widget;
    center_widget?: GtkTypes.Widget;
    end_widget?: GtkTypes.Widget;
}
export default class AgsCenterBox extends AgsBox {
    set children(children: InstanceType<typeof Gtk.Widget>[] | null);
    get start_widget(): InstanceType<typeof Gtk.Widget> | null;
    set start_widget(child: InstanceType<typeof Gtk.Widget> | null);
    get end_widget(): InstanceType<typeof Gtk.Widget> | null;
    set end_widget(child: InstanceType<typeof Gtk.Widget> | null);
    get center_widget(): InstanceType<typeof Gtk.Widget> | null;
    set center_widget(child: InstanceType<typeof Gtk.Widget> | null);
}