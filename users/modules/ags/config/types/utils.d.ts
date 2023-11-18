import Gtk from 'node_modules/@girs/gtk-3.0/gtk-3.0';
import Gio from 'node_modules/@girs/gio-2.0/gio-2.0';
import GObject from 'node_modules/@girs/gobject-2.0/gobject-2.0';
export declare const USER: string;
export declare const CACHE_DIR: string;
export declare function readFile(path: string): string;
export declare function readFileAsync(path: string): Promise<string>;
export declare function writeFile(string: string, path: string): Promise<Gio.File>;
export declare function loadInterfaceXML(iface: string): string | null;
export declare function bulkConnect(service: GObject.Object, list: [
    event: string,
    callback: (...args: any[]) => void
][]): number[];
export declare function bulkDisconnect(service: GObject.Object, ids: number[]): void;
export declare function interval(interval: number, callback: () => void, bind?: Gtk.Widget): number;
export declare function timeout(ms: number, callback: () => void): number;
export declare function lookUpIcon(name?: string, size?: number): Gtk.IconInfo | null;
export declare function ensureDirectory(path?: string): void;
export declare function execAsync(cmd: string | string[]): Promise<string>;
export declare function exec(cmd: string): string;
export declare function subprocess(cmd: string | string[], callback: (out: string) => void, onError?: typeof console.error, bind?: Gtk.Widget): Gio.Subprocess | null;
