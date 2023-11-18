import GObject from 'node_modules/@girs/gobject-2.0/gobject-2.0';
type Listen<T> = [string[] | string, (out: string) => T] | [string[] | string] | string[] | string;
type Poll<T> = [number, string[] | string | (() => T)] | [number, string[] | string | (() => T), (out: string) => T];
interface Options<T> {
    poll?: Poll<T>;
    listen?: Listen<T>;
}
export declare class Variable<T> extends GObject.Object {
    private _value;
    private _poll?;
    private _listen?;
    private _interval?;
    private _subprocess?;
    constructor(value: T, { poll, listen }?: Options<T>);
    connect(signal: string | undefined, callback: GObject.Object.NotifySignalCallback): number;
    startPoll(): void;
    stopPoll(): void;
    startListen(): void;
    stopListen(): void;
    get isListening(): boolean;
    get isPolling(): boolean;
    dispose(): void;
    getValue(): T;
    setValue(value: T): void;
    get value(): T;
    set value(value: T);
}
declare const _default: <T>(value: T, options?: Options<T> | undefined) => Variable<T>;
export default _default;
