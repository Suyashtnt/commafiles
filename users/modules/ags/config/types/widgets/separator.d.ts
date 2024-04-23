/// <reference types="@girs/dbusmenugtk3-0.4/node_modules/@girs/gtk-3.0/gtk-3.0-ambient.js" />
/// <reference types="@girs/gtk-3.0/gtk-3.0-ambient.js" />
import { type BaseProps, type Widget } from './widget.js';
import Gtk from 'node_modules/@girs/gtk-3.0/gtk-3.0';
export type SeparatorProps<Attr = unknown, Self = Separator<Attr>> = BaseProps<Self, Gtk.Separator.ConstructorProperties & {
    vertical?: boolean;
}, Attr>;
export declare function newSeparator<Attr = unknown>(...props: ConstructorParameters<typeof Separator<Attr>>): Separator<Attr>;
export interface Separator<Attr> extends Widget<Attr> {
}
export declare class Separator<Attr> extends Gtk.Separator {
    constructor(props?: SeparatorProps<Attr>);
    get vertical(): boolean;
    set vertical(v: boolean);
}
export default Separator;
