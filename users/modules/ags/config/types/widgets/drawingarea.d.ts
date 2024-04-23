/// <reference types="@girs/dbusmenugtk3-0.4/node_modules/@girs/gtk-3.0/gtk-3.0-ambient.js" />
/// <reference types="@girs/gtk-3.0/gtk-3.0-ambient.js" />
/// <reference types="@girs/cairo-1.0/cairo-1.0-ambient.js" />
import { type BaseProps, type Widget } from './widget.js';
import Gtk from 'node_modules/@girs/gtk-3.0/gtk-3.0';
import Cairo from 'gi://cairo?version=1.0';
type DrawFn<Self> = (self: Self, cr: Cairo.Context, width: number, height: number) => void;
export type DrawingAreaProps<Attr = unknown, Self = DrawingArea<Attr>> = BaseProps<Self, Gtk.DrawingArea.ConstructorProperties & {
    draw_fn?: DrawFn<Self>;
}, Attr>;
export declare function newDrawingArea<Attr = unknown>(...props: ConstructorParameters<typeof DrawingArea<Attr>>): DrawingArea<Attr>;
export interface DrawingArea<Attr> extends Widget<Attr> {
}
export declare class DrawingArea<Attr> extends Gtk.DrawingArea {
    constructor(props?: DrawingAreaProps<Attr>);
    get draw_fn(): DrawFn<this>;
    set draw_fn(fn: DrawFn<this>);
}
export default DrawingArea;
