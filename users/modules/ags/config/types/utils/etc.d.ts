/// <reference types="@girs/gobject-2.0/gobject-2.0-ambient" />
/// <reference types="@girs/gtk-3.0/node_modules/@girs/gobject-2.0/gobject-2.0-ambient" />
/// <reference types="@girs/gtk-3.0/node_modules/@girs/harfbuzz-0.0/node_modules/@girs/gobject-2.0/gobject-2.0-ambient" />
/// <reference types="@girs/dbusmenugtk3-0.4/node_modules/@girs/gtk-3.0/gtk-3.0-ambient" />
/// <reference types="@girs/gtk-3.0/gtk-3.0-ambient" />
import Gtk from 'node_modules/@girs/gtk-3.0/gtk-3.0';
import GObject from 'node_modules/@girs/gobject-2.0/gobject-2.0';
export declare function loadInterfaceXML(iface: string): string | null;
export declare function bulkConnect(service: GObject.Object, list: Array<[event: string, callback: (...args: any[]) => void]>): number[];
export declare function bulkDisconnect(service: GObject.Object, ids: number[]): void;
export declare function lookUpIcon(name?: string, size?: number): Gtk.IconInfo | null;
export declare function ensureDirectory(path: string): void;
