/// <reference types="@girs/dbusmenugtk3-0.4/node_modules/@girs/gtk-3.0/gtk-3.0-ambient.js" />
/// <reference types="@girs/gtk-3.0/gtk-3.0-ambient.js" />
import Gtk from 'node_modules/@girs/gtk-3.0/gtk-3.0';
interface Config {
    windows?: Gtk.Window[];
    style?: string;
    notificationPopupTimeout: number;
    notificationForceTimeout: boolean;
    cacheNotificationActions: boolean;
    cacheCoverArt: boolean;
    closeWindowDelay: {
        [key: string]: number;
    };
    maxStreamVolume: number;
    onWindowToggled?: (windowName: string, visible: boolean) => void;
    onConfigParsed?: (app: App) => void;
}
export declare class App extends Gtk.Application {
    private _dbus;
    private _closeDelay;
    private _cssProviders;
    private _objectPath;
    private _windows;
    private _configPath;
    private _configDir;
    private _config;
    get windows(): Map<string, Gtk.Window>;
    get configPath(): string;
    get configDir(): string;
    get config(): Config;
    resetCss(): void;
    applyCss(path: string): void;
    setup(bus: string, path: string, configPath: string): void;
    vfunc_activate(): void;
    connect(signal: string | undefined, callback: (_: this, ...args: any[]) => void): number;
    toggleWindow(name: string): string | undefined;
    openWindow(name: string): void;
    closeWindow(name: string): void;
    getWindow(name: string): Gtk.Window | undefined;
    removeWindow(w: Gtk.Window | string): void;
    addWindow(w: Gtk.Window): void;
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
