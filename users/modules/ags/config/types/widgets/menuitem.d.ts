/// <reference types="@girs/dbusmenugtk3-0.4/node_modules/@girs/gtk-3.0/gtk-3.0-ambient.js" />
/// <reference types="@girs/gtk-3.0/gtk-3.0-ambient.js" />
import { type BaseProps, type Widget } from './widget.js';
import Gtk from 'node_modules/@girs/gtk-3.0/gtk-3.0';
type Event<Self> = (self: Self) => boolean | unknown;
export type MenuItemProps<Child extends Gtk.Widget = Gtk.Widget, Attr = unknown, Self = MenuItem<Child, Attr>> = BaseProps<Self, Gtk.MenuItem.ConstructorProperties & {
    child?: Child;
    on_activate?: Event<Self>;
    on_select?: Event<Self>;
    on_deselct?: Event<Self>;
}, Attr>;
export declare function newMenuItem<Child extends Gtk.Widget = Gtk.Widget, Attr = unknown>(...props: ConstructorParameters<typeof MenuItem<Child, Attr>>): MenuItem<Child, Attr>;
export interface MenuItem<Child, Attr> extends Widget<Attr> {
}
export declare class MenuItem<Child extends Gtk.Widget, Attr> extends Gtk.MenuItem {
    constructor(props?: MenuItemProps<Child, Attr>, child?: Child);
    get child(): Child;
    set child(child: Child);
    get on_activate(): Event<this>;
    set on_activate(callback: Event<this>);
    get on_select(): Event<this>;
    set on_select(callback: Event<this>);
    get on_deselect(): Event<this>;
    set on_deselect(callback: Event<this>);
}
export default MenuItem;
