/// <reference types="@girs/dbusmenugtk3-0.4/node_modules/@girs/gtk-3.0/gtk-3.0-ambient.js" />
/// <reference types="@girs/gtk-3.0/gtk-3.0-ambient.js" />
import { type BaseProps, type Widget } from './widget.js';
import Gtk from 'node_modules/@girs/gtk-3.0/gtk-3.0';
declare const TRANSITION: {
    readonly none: Gtk.RevealerTransitionType.NONE;
    readonly crossfade: Gtk.RevealerTransitionType.CROSSFADE;
    readonly slide_right: Gtk.RevealerTransitionType.SLIDE_RIGHT;
    readonly slide_left: Gtk.RevealerTransitionType.SLIDE_LEFT;
    readonly slide_up: Gtk.RevealerTransitionType.SLIDE_UP;
    readonly slide_down: Gtk.RevealerTransitionType.SLIDE_DOWN;
};
type Transition = keyof typeof TRANSITION;
export type RevealerProps<Child extends Gtk.Widget = Gtk.Widget, Attr = unknown, Self = Revealer<Child, Attr>> = BaseProps<Self, Gtk.Revealer.ConstructorProperties & {
    child?: Child;
    transition?: Transition;
}, Attr>;
export declare function newRevealer<Child extends Gtk.Widget = Gtk.Widget, Attr = unknown>(...props: ConstructorParameters<typeof Revealer<Child, Attr>>): Revealer<Child, Attr>;
export interface Revealer<Child, Attr> extends Widget<Attr> {
}
export declare class Revealer<Child extends Gtk.Widget, Attr> extends Gtk.Revealer {
    constructor(props?: RevealerProps<Child, Attr>, child?: Child);
    get child(): Child;
    set child(child: Child);
    get transition(): Transition;
    set transition(transition: Transition);
}
export default Revealer;
