/// <reference types="@girs/gobject-2.0/gobject-2.0-ambient" />
/// <reference types="@girs/gtk-3.0/node_modules/@girs/gobject-2.0/gobject-2.0-ambient" />
/// <reference types="@girs/gtk-3.0/node_modules/@girs/harfbuzz-0.0/node_modules/@girs/gobject-2.0/gobject-2.0-ambient" />
import GObject from 'node_modules/@girs/gobject-2.0/gobject-2.0';
export type PspecFlag = 'rw' | 'r' | 'w';
export type PspecType = 'jsobject' | 'string' | 'int' | 'float' | 'double' | 'boolean' | 'gobject' | 'widget';
export declare function pspec(name: string, type?: PspecType, handle?: PspecFlag): GObject.ParamSpecString | GObject.ParamSpecInt64 | GObject.ParamSpecFloat | GObject.ParamSpecDouble | GObject.ParamSpecBoolean | GObject.ParamSpecObject | GObject.ParamSpecBoxed;
export declare function registerGObject<Obj extends {
    new (...args: any[]): GObject.Object;
}, Config extends {
    typename?: string;
    signals?: {
        [signal: string]: PspecType[];
    };
    properties?: {
        [prop: string]: [type?: PspecType, handle?: PspecFlag];
    };
    cssName?: string;
}>(object: Obj, config?: Config): void;
