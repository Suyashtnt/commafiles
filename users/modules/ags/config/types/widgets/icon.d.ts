/// <reference types="@girs/dbusmenugtk3-0.4/node_modules/@girs/gtk-3.0/gtk-3.0-ambient.js" />
/// <reference types="@girs/gtk-3.0/gtk-3.0-ambient.js" />
/// <reference types="@girs/gdkpixbuf-2.0/gdkpixbuf-2.0-ambient.js" />
import { type BaseProps, type Widget } from './widget.js';
import Gtk from 'node_modules/@girs/gtk-3.0/gtk-3.0';
import GdkPixbuf from 'node_modules/@girs/gdkpixbuf-2.0/gdkpixbuf-2.0';
import cairo from '@girs/cairo-1.0';
type Ico = string | GdkPixbuf.Pixbuf;
export type IconProps<Attr = unknown, Self = Icon<Attr>> = BaseProps<Self, Gtk.Image.ConstructorProperties & {
    size?: number;
    icon?: Ico;
}, Attr>;
export declare function newIcon<Attr = unknown>(...props: ConstructorParameters<typeof Icon<Attr>>): Icon<Attr>;
export interface Icon<Attr> extends Widget<Attr> {
}
export declare class Icon<Attr> extends Gtk.Image {
    constructor(props?: IconProps<Attr> | Ico);
    get size(): number;
    set size(size: number);
    get icon(): string | GdkPixbuf.Pixbuf;
    set icon(icon: string | GdkPixbuf.Pixbuf);
    private _previousSize;
    private _fontSize;
    private _size;
    vfunc_draw(cr: cairo.Context): boolean;
}
export default Icon;
