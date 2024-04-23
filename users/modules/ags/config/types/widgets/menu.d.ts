/// <reference types="@girs/dbusmenugtk3-0.4/node_modules/@girs/gtk-3.0/gtk-3.0-ambient.js" />
/// <reference types="@girs/gtk-3.0/gtk-3.0-ambient.js" />
import { type BaseProps, type Widget } from './widget.js';
import Gtk from 'node_modules/@girs/gtk-3.0/gtk-3.0';
type MenuEventHandler<Self> = {
    on_popup?: (self: Self, flipped_rect: any | null, final_rect: any | null, flipped_x: boolean, flipped_y: boolean) => void | unknown;
    on_move_scroll?: (self: Self, scroll_type: Gtk.ScrollType) => void | unknown;
};
export type MenuProps<MenuItem extends Gtk.MenuItem = Gtk.MenuItem, Attr = unknown, Self = Menu<MenuItem, Attr>> = BaseProps<Self, Gtk.Menu.ConstructorProperties & {
    children?: MenuItem[];
} & MenuEventHandler<Self>, Attr>;
export declare function newMenu<MenuItem extends Gtk.MenuItem = Gtk.MenuItem, Attr = unknown>(...props: ConstructorParameters<typeof Menu<MenuItem, Attr>>): Menu<MenuItem, Attr>;
export interface Menu<MenuItem, Attr> extends Widget<Attr> {
}
export declare class Menu<MenuItem extends Gtk.MenuItem, Attr> extends Gtk.Menu {
    constructor(props?: MenuProps<MenuItem, Attr>, ...children: Gtk.MenuItem[]);
    get on_popup(): MenuEventHandler<this>['on_popup'];
    set on_popup(callback: MenuEventHandler<this>['on_popup']);
    get on_move_scroll(): MenuEventHandler<this>['on_move_scroll'];
    set on_move_scroll(callback: MenuEventHandler<this>['on_move_scroll']);
    get children(): MenuItem[];
    set children(children: MenuItem[]);
}
export default Menu;
