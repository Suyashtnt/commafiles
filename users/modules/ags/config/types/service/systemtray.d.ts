import "../gtk-types/gtk-3.0-ambient.js";
import "../gtk-types/gdk-3.0-ambient.js";
import "../gtk-types/cairo-1.0-ambient.js";
import "../gtk-types/gnomebluetooth-3.0-ambient.js";
import "../gtk-types/dbusmenugtk3-0.4-ambient.js";
import "../gtk-types/gobject-2.0-ambient.js";
import "../gtk-types/nm-1.0-ambient.js";
import "../gtk-types/soup-3.0-ambient.js";
import "../gtk-types/gvc-1.0-ambient.js";
import Gio from 'gi://Gio';
import Gdk from 'gi://Gdk?version=3.0';
import DbusmenuGtk3 from 'gi://DbusmenuGtk3';
import Service from '../service.js';
export declare class TrayItem extends Service {
    private _proxy;
    private _busName;
    private _iconTheme?;
    menu?: InstanceType<typeof DbusmenuGtk3.Menu>;
    constructor(busName: string, objectPath: string);
    activate(event: InstanceType<typeof Gdk.Event>): void;
    secondaryActivate(event: InstanceType<typeof Gdk.Event>): void;
    scroll(event: InstanceType<typeof Gdk.EventScroll>): void;
    openMenu(event: InstanceType<typeof Gdk.Event>): void;
    get category(): string;
    get id(): string;
    get title(): string;
    get status(): string;
    get window_id(): number;
    get is_menu(): boolean;
    get tooltip_markup(): string;
    get icon(): string | import("../gtk-types/gdkpixbuf-2.0.js").GdkPixbuf.Pixbuf;
    private _itemProxyAcquired;
    _notify(): void;
    private _refreshAllProperties;
    private _getPixbuf;
}
declare class SystemTray extends Service {
    private _dbus;
    private _items;
    get IsStatusNotifierHostRegistered(): boolean;
    get ProtocolVersion(): number;
    get RegisteredStatusNotifierItems(): string[];
    get items(): TrayItem[];
    getItem(name: string): TrayItem | undefined;
    constructor();
    private _register;
    RegisterStatusNotifierItemAsync(serviceName: string[], invocation: InstanceType<typeof Gio.DBusMethodInvocation>): void;
}
declare const _default: SystemTray;
export default _default;