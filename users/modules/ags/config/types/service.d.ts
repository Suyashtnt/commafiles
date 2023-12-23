/// <reference types="@girs/gobject-2.0/gobject-2.0-ambient.js" />
/// <reference types="@girs/gtk-3.0/node_modules/@girs/gobject-2.0/gobject-2.0-ambient.js" />
/// <reference types="@girs/gtk-3.0/node_modules/@girs/harfbuzz-0.0/node_modules/@girs/gobject-2.0/gobject-2.0-ambient.js" />
import GObject from 'node_modules/@girs/gobject-2.0/gobject-2.0';
import { PspecFlag, PspecType } from './gobject.js';
export declare const kebabify: (str: string) => string;
export type OnlyString<S extends string | unknown> = S extends string ? S : never;
export type Props<T> = Pick<T, {
    [K in keyof T]: T[K] extends (...args: any[]) => any ? never : OnlyString<K>;
}[keyof T]>;
export type BindableProps<T> = {
    [K in keyof T]: Binding<any, any, NonNullable<T[K]>> | T[K];
};
export declare class Binding<Emitter extends GObject.Object, Prop extends keyof Props<Emitter>, Return = Emitter[Prop]> {
    emitter: Emitter;
    prop: Prop;
    transformFn: (v: Return) => Return;
    constructor(emitter: Emitter, prop: Prop);
    transform<T>(fn: (v: Return) => T): Binding<Emitter, Prop, T>;
}
export default class Service extends GObject.Object {
    static pspec(name: string, type?: PspecType, handle?: PspecFlag): GObject.ParamSpecString | GObject.ParamSpecInt64 | GObject.ParamSpecFloat | GObject.ParamSpecDouble | GObject.ParamSpecBoolean | GObject.ParamSpecObject | GObject.ParamSpecBoxed;
    static register(service: new (...args: any[]) => GObject.Object, signals?: {
        [signal: string]: PspecType[];
    }, properties?: {
        [prop: string]: [type?: PspecType, handle?: PspecFlag];
    }): void;
    connect(signal: string | undefined, callback: (_: this, ...args: any[]) => void): number;
    updateProperty(prop: string, value: unknown): void;
    changed(property: string): void;
    bind<Prop extends keyof Props<this>>(prop: Prop): Binding<this, Prop, this[Prop]>;
}
