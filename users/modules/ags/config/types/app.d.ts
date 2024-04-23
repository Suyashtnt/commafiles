/// <reference types="@girs/dbusmenugtk3-0.4/node_modules/@girs/gtk-3.0/gtk-3.0-ambient.js" />
/// <reference types="@girs/gtk-3.0/gtk-3.0-ambient.js" />
import Gtk from 'node_modules/@girs/gtk-3.0/gtk-3.0';
export interface Config {
    windows?: Gtk.Window[] | (() => Gtk.Window[]);
    style?: string;
    icons?: string;
    gtkTheme?: string;
    iconTheme?: string;
    cursorTheme?: string;
    closeWindowDelay?: {
        [key: string]: number;
    };
    onWindowToggled?: (windowName: string, visible: boolean) => void;
    onConfigParsed?: (app: App) => void;
    notificationPopupTimeout?: number;
    notificationForceTimeout?: boolean;
    cacheNotificationActions?: boolean;
    cacheCoverArt?: boolean;
    maxStreamVolume?: number;
}
export declare class App extends Gtk.Application {
    private _dbus;
    private _cssProviders;
    private _objectPath;
    private _windows;
    private _configPath;
    private _configDir;
    private _closeWindowDelay;
    get closeWindowDelay(): {
        [key: string]: number;
    };
    set closeWindowDelay(v: {
        [key: string]: number;
    });
    get windows(): Gtk.Window[];
    get configPath(): string;
    get configDir(): string;
    set iconTheme(name: string);
    get iconTheme(): string;
    set cursorTheme(name: string);
    get cursorTheme(): string;
    set gtkTheme(name: string);
    get gtkTheme(): string;
    readonly resetCss: () => void;
    readonly applyCss: (pathOrStyle: string, reset?: boolean) => void;
    readonly addIcons: (path: string) => void;
    setup(bus: string, path: string, configDir: string, entry: string): void;
    vfunc_activate(): void;
    readonly connect: (signal: string | undefined, callback: (_: this, ...args: any[]) => void) => number;
    readonly toggleWindow: (name: string) => string | undefined;
    readonly openWindow: (name: string) => void;
    readonly closeWindow: (name: string) => void;
    readonly getWindow: (name: string) => Gtk.Window | undefined;
    readonly removeWindow: (w: Gtk.Window | string) => void;
    readonly addWindow: (w: Gtk.Window) => void;
    readonly quit: () => void;
    readonly config: (config: Config) => void;
    private _load;
    private _register;
    toJSON(): {
        bus: string | null;
        configDir: string;
        windows: {
            [k: string]: Gtk.Window;
        };
    };
    RunJs(js: string, clientBusName?: string, clientObjPath?: string): void;
    RunFile(file: string, bus?: string, path?: string): void;
    RunPromise(js: string, busName?: string, objPath?: string): void;
    ToggleWindow(name: string): string;
    Inspector(): void;
    Quit(): void;
}
export declare const app: App;
export default app;
