/// <reference types="@girs/dbusmenugtk3-0.4/node_modules/@girs/gtk-3.0/gtk-3.0-ambient.js" />
/// <reference types="@girs/gtk-3.0/gtk-3.0-ambient.js" />
import { type BaseProps, type Widget } from './widget.js';
import Gtk from 'node_modules/@girs/gtk-3.0/gtk-3.0';
type Event<Self> = (self: Self) => void | boolean;
export type ToggleButtonProps<Child extends Gtk.Widget = Gtk.Widget, Attr = unknown, Self = ToggleButton<Child, Attr>> = BaseProps<Self, Gtk.ToggleButton.ConstructorProperties & {
    child?: Child;
    on_toggled?: Event<Self>;
}, Attr>;
export declare function newToggleButton<Child extends Gtk.Widget = Gtk.Widget, Attr = unknown>(...props: ConstructorParameters<typeof ToggleButton<Child, Attr>>): ToggleButton<Child, Attr>;
export interface ToggleButton<Child, Attr> extends Widget<Attr> {
}
export declare class ToggleButton<Child extends Gtk.Widget, Attr> extends Gtk.ToggleButton {
    constructor(props?: ToggleButtonProps<Child, Attr>, child?: Child);
    get child(): Child;
    set child(child: Child);
    get on_toggled(): Event<this>;
    set on_toggled(callback: Event<this>);
}
export {};
