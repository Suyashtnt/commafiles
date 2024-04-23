/// <reference types="@girs/dbusmenugtk3-0.4/node_modules/@girs/gtk-3.0/gtk-3.0-ambient.js" />
/// <reference types="@girs/gtk-3.0/gtk-3.0-ambient.js" />
/// <reference types="@girs/gdk-3.0/gdk-3.0-ambient.js" />
/// <reference types="@girs/gtk-3.0/node_modules/@girs/gdk-3.0/gdk-3.0-ambient.js" />
import { type BaseProps, type Widget } from './widget.js';
import Gtk from 'node_modules/@girs/gtk-3.0/gtk-3.0';
import Gdk from 'node_modules/@girs/gdk-2.0/gdk-2.0?version=3.0';
declare const ANCHOR: {
    readonly left: any;
    readonly right: any;
    readonly top: any;
    readonly bottom: any;
};
declare const LAYER: {
    readonly background: any;
    readonly bottom: any;
    readonly top: any;
    readonly overlay: any;
};
declare const KEYMODE: {
    readonly 'on-demand': any;
    readonly exclusive: any;
    readonly none: any;
};
type Layer = keyof typeof LAYER;
type Anchor = keyof typeof ANCHOR;
type Exclusivity = 'normal' | 'ignore' | 'exclusive';
type Keymode = keyof typeof KEYMODE;
export type WindowProps<Child extends Gtk.Widget = Gtk.Widget, Attr = unknown, Self = Window<Child, Attr>> = BaseProps<Self, Gtk.Window.ConstructorProperties & {
    child?: Child;
    anchor?: Anchor[];
    exclusivity?: Exclusivity;
    layer?: Layer;
    margins?: number[];
    monitor?: number;
    gdkmonitor?: Gdk.Monitor;
    visible?: boolean;
    keymode?: Keymode;
    popup?: boolean;
    exclusive?: boolean;
    focusable?: boolean;
}, Attr>;
export declare function newWindow<Child extends Gtk.Widget = Gtk.Widget, Attr = unknown>(...props: ConstructorParameters<typeof Window<Child, Attr>>): Window<Child, Attr>;
export interface Window<Child, Attr> extends Widget<Attr> {
}
export declare class Window<Child extends Gtk.Widget, Attr> extends Gtk.Window {
    constructor({ anchor, exclusive, exclusivity, focusable, keymode, layer, margins, monitor, gdkmonitor, popup, visible, ...params }?: WindowProps<Child, Attr>, child?: Child);
    get child(): Child;
    set child(child: Child);
    get gdkmonitor(): Gdk.Monitor | null;
    set gdkmonitor(monitor: Gdk.Monitor | null);
    get monitor(): number;
    set monitor(monitor: number);
    get exclusive(): boolean;
    set exclusive(exclusive: boolean);
    get exclusivity(): Exclusivity;
    set exclusivity(exclusivity: Exclusivity);
    get layer(): Layer;
    set layer(layer: Layer);
    get anchor(): Anchor[];
    set anchor(anchor: Anchor[]);
    get margins(): number[];
    set margins(margin: number[]);
    get popup(): boolean;
    set popup(popup: boolean);
    get focusable(): boolean;
    set focusable(focusable: boolean);
    get keymode(): Keymode;
    set keymode(mode: Keymode);
}
export default Window;
