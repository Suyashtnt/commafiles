import Gtk from 'node_modules/@girs/gtk-3.0/gtk-3.0';
import AgsBox, { type BoxProps } from './box.js';
export interface CenterBoxProps extends BoxProps<AgsCenterBox> {
    start_widget?: Gtk.Widget;
    center_widget?: Gtk.Widget;
    end_widget?: Gtk.Widget;
}
export default class AgsCenterBox extends AgsBox {
    constructor(props?: CenterBoxProps);
    set children(children: Gtk.Widget[]);
    get start_widget(): Gtk.Widget | null;
    set start_widget(child: Gtk.Widget | null);
    get end_widget(): Gtk.Widget | null;
    set end_widget(child: Gtk.Widget | null);
    get center_widget(): Gtk.Widget | null;
    set center_widget(child: Gtk.Widget | null);
}
