/// <reference types="@girs/dbusmenugtk3-0.4/node_modules/@girs/gtk-3.0/gtk-3.0-ambient.js" />
/// <reference types="@girs/gtk-3.0/gtk-3.0-ambient.js" />
import { type BaseProps, type Widget } from './widget.js';
import Gtk from 'node_modules/@girs/gtk-3.0/gtk-3.0';
type Event<Self> = (self: Self) => void | boolean;
export type FileChooserButtonProps<Child extends Gtk.Widget = Gtk.Widget, Attr = unknown, Self = FileChooserButton<Child, Attr>> = BaseProps<Self, Gtk.FileChooserButton.ConstructorProperties & {
    child?: Child;
    on_file_set?: Event<Self>;
}, Attr>;
export declare function newFileChooserButton<Child extends Gtk.Widget = Gtk.Widget, Attr = unknown>(...props: ConstructorParameters<typeof FileChooserButton<Child, Attr>>): FileChooserButton<Child, Attr>;
export interface FileChooserButton<Child, Attr> extends Widget<Attr> {
}
export declare class FileChooserButton<Child extends Gtk.Widget, Attr> extends Gtk.FileChooserButton {
    constructor(props?: FileChooserButtonProps<Child, Attr>, child?: Child);
    get child(): Child;
    set child(child: Child);
    get on_file_set(): Event<this>;
    set on_file_set(callback: Event<this>);
    get uri(): string | null;
    get uris(): string[];
}
export default FileChooserButton;
