/// <reference types="@girs/dbusmenugtk3-0.4/node_modules/@girs/gtk-3.0/gtk-3.0-ambient.js" />
/// <reference types="@girs/gtk-3.0/gtk-3.0-ambient.js" />
import { type BaseProps, type Widget } from './widget.js';
import Gtk from 'node_modules/@girs/gtk-3.0/gtk-3.0';
type Event<Self> = (self: Self) => void | boolean;
export type FontButtonProps<Child extends Gtk.Widget = Gtk.Widget, Attr = unknown, Self = FontButton<Child, Attr>> = BaseProps<Self, Gtk.FontButton.ConstructorProperties & {
    child?: Child;
    on_font_set?: Event<Self>;
}, Attr>;
export declare function newFontButton<Child extends Gtk.Widget = Gtk.Widget, Attr = unknown>(...props: ConstructorParameters<typeof FontButton<Child, Attr>>): FontButton<Child, Attr>;
export interface FontButton<Child, Attr> extends Widget<Attr> {
}
export declare class FontButton<Child extends Gtk.Widget, Attr> extends Gtk.FontButton {
    constructor(props?: FontButtonProps<Child, Attr>, child?: Child);
    get child(): Child;
    set child(child: Child);
    get on_font_set(): Event<this>;
    set on_font_set(callback: Event<this>);
}
export default FontButton;
