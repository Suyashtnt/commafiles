/// <reference types="@girs/dbusmenugtk3-0.4/node_modules/@girs/gtk-3.0/gtk-3.0-ambient.js" />
/// <reference types="@girs/gtk-3.0/gtk-3.0-ambient.js" />
import { type BaseProps, type Widget } from './widget.js';
import Gtk from 'node_modules/@girs/gtk-3.0/gtk-3.0';
export type BoxProps<Child extends Gtk.Widget = Gtk.Widget, Attr = unknown, Self = Box<Child, Attr>> = BaseProps<Self, Gtk.Box.ConstructorProperties & {
    child?: Child;
    children?: Child[];
    vertical?: boolean;
}, Attr>;
export declare function newBox<Child extends Gtk.Widget = Gtk.Widget, Attr = unknown>(...props: ConstructorParameters<typeof Box<Child, Attr>>): Box<Child, Attr>;
export interface Box<Child, Attr> extends Widget<Attr> {
}
export declare class Box<Child extends Gtk.Widget, Attr> extends Gtk.Box {
    constructor(propsOrChildren?: BoxProps<Child, Attr> | Child[], ...children: Gtk.Widget[]);
    get child(): Child;
    set child(child: Child);
    get children(): Child[];
    set children(children: Child[]);
    get vertical(): boolean;
    set vertical(v: boolean);
}
export default Box;
