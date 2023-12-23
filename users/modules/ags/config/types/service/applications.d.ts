/// <reference types="@girs/gio-2.0/gio-2.0-ambient.js" />
/// <reference types="@girs/gtk-3.0/node_modules/@girs/gio-2.0/gio-2.0-ambient.js" />
/// <reference types="@girs/nm-1.0/node_modules/@girs/gio-2.0/gio-2.0-ambient.js" />
import Gio from 'node_modules/@girs/gio-2.0/gio-2.0';
import Service from '../service.js';
export declare class Application extends Service {
    _app: Gio.DesktopAppInfo;
    _frequency: number;
    get app(): Gio.DesktopAppInfo;
    get frequency(): number;
    set frequency(value: number);
    get name(): string | null;
    get desktop(): string | null;
    get description(): string | null;
    get wm_class(): string | null;
    get executable(): string;
    get icon_name(): string | null;
    constructor(app: Gio.DesktopAppInfo, frequency?: number);
    private _match;
    getKey(key: string): string | null;
    match(term: string): boolean;
    launch(): void;
}
export declare class Applications extends Service {
    private _list;
    private _frequents;
    query(term: string): Application[];
    constructor();
    get list(): Application[];
    get frequents(): {
        [app: string]: number;
    };
    private _launched;
    reload(): void;
}
export declare const applications: Applications;
export default applications;
