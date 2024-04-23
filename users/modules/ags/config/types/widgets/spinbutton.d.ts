/// <reference types="@girs/dbusmenugtk3-0.4/node_modules/@girs/gtk-3.0/gtk-3.0-ambient.js" />
/// <reference types="@girs/gtk-3.0/gtk-3.0-ambient.js" />
import { type BaseProps, type Widget } from './widget.js';
import Gtk from 'node_modules/@girs/gtk-3.0/gtk-3.0';
type Event<Self> = (self: Self) => void | boolean;
export type SpinButtonProps<Attr = unknown, Self = SpinButton<Attr>> = BaseProps<Self, Gtk.SpinButton.ConstructorProperties & {
    on_value_changed?: Event<Self>;
    range?: [min: number, max: number];
    increments?: [step: number, page: number];
}, Attr>;
export declare function newSpinButton<Attr = unknown>(...props: ConstructorParameters<typeof SpinButton<Attr>>): SpinButton<Attr>;
export interface SpinButton<Attr> extends Widget<Attr> {
}
export declare class SpinButton<Attr> extends Gtk.SpinButton {
    constructor(props?: SpinButtonProps<Attr>);
    get on_value_changed(): Event<this>;
    set on_value_changed(callback: Event<this>);
    get range(): [number, number];
    set range([min, max]: [number, number]);
    get increments(): [number, number];
    set increments([step, page]: [number, number]);
}
export default SpinButton;
