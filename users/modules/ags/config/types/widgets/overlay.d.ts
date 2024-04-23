/// <reference types="@girs/dbusmenugtk3-0.4/node_modules/@girs/gtk-3.0/gtk-3.0-ambient.js" />
/// <reference types="@girs/gtk-3.0/gtk-3.0-ambient.js" />
import { type BaseProps, type Widget } from './widget.js';
import Gtk from 'node_modules/@girs/gtk-3.0/gtk-3.0';
export type OverlayProps<Child extends Gtk.Widget = Gtk.Widget, OverlayChild extends Gtk.Widget = Gtk.Widget, Attr = unknown, Self = Overlay<Child, OverlayChild, Attr>> = BaseProps<Self, Gtk.Overlay.ConstructorProperties & {
    pass_through?: boolean;
    overlays?: OverlayChild[];
    overlay?: OverlayChild;
    child?: Child;
}, Attr>;
export declare function newOverlay<Child extends Gtk.Widget = Gtk.Widget, OverlayChild extends Gtk.Widget = Gtk.Widget, Attr = unknown>(...props: ConstructorParameters<typeof Overlay<Child, OverlayChild, Attr>>): Overlay<Child, OverlayChild, Attr>;
export interface Overlay<Child, OverlayChild, Attr> extends Widget<Attr> {
}
export declare class Overlay<Child extends Gtk.Widget, OverlayChild extends Gtk.Widget, Attr> extends Gtk.Overlay {
    constructor(props?: OverlayProps<Child, OverlayChild, Attr>, child?: Child, ...overlays: Gtk.Widget[]);
    private _updatePassThrough;
    get pass_through(): boolean;
    set pass_through(passthrough: boolean);
    get overlay(): Child;
    set overlay(overlay: Child);
    get overlays(): Child[];
    set overlays(overlays: Child[]);
}
export default Overlay;
