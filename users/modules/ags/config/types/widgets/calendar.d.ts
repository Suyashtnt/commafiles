/// <reference types="@girs/dbusmenugtk3-0.4/node_modules/@girs/gtk-3.0/gtk-3.0-ambient.js" />
/// <reference types="@girs/gtk-3.0/gtk-3.0-ambient.js" />
import { type BaseProps, type Widget } from './widget.js';
import Gtk from 'node_modules/@girs/gtk-3.0/gtk-3.0';
type Event<Self> = (self: Self) => void;
type Detail<Self> = (self: Self, year: number, month: number, day: number) => string | null;
export type CalendarProps<Attr = unknown, Self = Calendar<Attr>> = BaseProps<Self, Gtk.Calendar.ConstructorProperties & {
    on_day_selected?: Event<Self>;
    detail?: Detail<Self>;
}, Attr>;
export declare function newCalendar<Attr = unknown>(...props: ConstructorParameters<typeof Calendar<Attr>>): Calendar<Attr>;
export interface Calendar<Attr> extends Widget<Attr> {
}
export declare class Calendar<Attr> extends Gtk.Calendar {
    constructor(props?: CalendarProps<Attr>);
    get date(): [number, number, number];
    get on_day_selected(): Event<this>;
    set on_day_selected(callback: Event<this>);
    get detail(): Detail<this>;
    set detail(func: Detail<this>);
}
export default Calendar;
