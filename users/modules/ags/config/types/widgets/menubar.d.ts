/// <reference types="@girs/dbusmenugtk3-0.4/node_modules/@girs/gtk-3.0/gtk-3.0-ambient.js" />
/// <reference types="@girs/gtk-3.0/gtk-3.0-ambient.js" />
import { type BaseProps, type Widget } from './widget.js';
import Gtk from 'node_modules/@girs/gtk-3.0/gtk-3.0';
export type MenuBarProps<Attr = unknown, Self = MenuBar<Attr>> = BaseProps<Self, Gtk.MenuBar.ConstructorProperties, Attr>;
export declare function newMenuBar<Attr = unknown>(...props: ConstructorParameters<typeof MenuBar<Attr>>): MenuBar<Attr>;
export interface MenuBar<Attr> extends Widget<Attr> {
}
export declare class MenuBar<Attr> extends Gtk.MenuBar {
    constructor(props?: MenuBarProps<Attr>);
}
export default MenuBar;
