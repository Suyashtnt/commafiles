import GObject from 'node_modules/@girs/gobject-2.0/gobject-2.0';
type PspecType = 'jsobject' | 'string' | 'int' | 'float' | 'double' | 'boolean' | 'gobject';
type PspecFlag = 'rw' | 'r' | 'w';
export default class Service extends GObject.Object {
    static pspec(name: string, type?: PspecType, handle?: PspecFlag): GObject.ParamSpecString | GObject.ParamSpecInt64 | GObject.ParamSpecFloat | GObject.ParamSpecDouble | GObject.ParamSpecBoolean | GObject.ParamSpecObject | GObject.ParamSpecBoxed;
    static register(service: new (...args: any[]) => GObject.Object, signals?: {
        [signal: string]: string[];
    }, properties?: {
        [prop: string]: [type?: PspecType, handle?: PspecFlag];
    }): void;
    connect(signal: string | undefined, callback: (_: this, ...args: any[]) => void): number;
    updateProperty(prop: string, value: unknown): void;
    changed(property: string): void;
}
export {};
