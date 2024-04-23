/// <reference types="@girs/dbusmenugtk3-0.4/node_modules/@girs/gtk-3.0/gtk-3.0-ambient.js" />
/// <reference types="@girs/gtk-3.0/gtk-3.0-ambient.js" />
import { type BaseProps, type Widget } from './widget.js';
import Gtk from 'node_modules/@girs/gtk-3.0/gtk-3.0';
type BarMode = 'continuous' | 'discrete';
export type LevelBarProps<Attr = unknown, Self = LevelBar<Attr>> = BaseProps<Self, Gtk.LevelBar.ConstructorProperties & {
    bar_mode?: BarMode;
    vertical?: boolean;
}, Attr>;
export declare function newLevelBar<Attr = unknown>(...props: ConstructorParameters<typeof LevelBar<Attr>>): LevelBar<Attr>;
export interface LevelBar<Attr> extends Widget<Attr> {
}
export declare class LevelBar<Attr> extends Gtk.LevelBar {
    constructor(props?: LevelBarProps<Attr>);
    get bar_mode(): BarMode;
    set bar_mode(mode: BarMode);
    get vertical(): boolean;
    set vertical(v: boolean);
}
export default LevelBar;
