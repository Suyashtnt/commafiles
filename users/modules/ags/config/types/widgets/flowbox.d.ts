/// <reference types="@girs/dbusmenugtk3-0.4/node_modules/@girs/gtk-3.0/gtk-3.0-ambient.js" />
/// <reference types="@girs/gtk-3.0/gtk-3.0-ambient.js" />
import { type BaseProps, type Widget } from './widget.js';
import Gtk from 'node_modules/@girs/gtk-3.0/gtk-3.0';
export type FlowBoxProps<Attr = unknown, Self = FlowBox<Attr>> = BaseProps<Self, Gtk.FlowBox.ConstructorProperties, Attr>;
export declare function newFlowBox<Attr = unknown>(...props: ConstructorParameters<typeof FlowBox<Attr>>): FlowBox<Attr>;
export interface FlowBox<Attr> extends Widget<Attr> {
}
export declare class FlowBox<Attr> extends Gtk.FlowBox {
    constructor(props?: FlowBoxProps<Attr>);
}
export default FlowBox;
