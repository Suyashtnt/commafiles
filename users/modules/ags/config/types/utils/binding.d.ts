import { Binding, Connectable } from '../service.js';
import { Variable } from '../variable.js';
type Dep<T> = Binding<any, any, T>;
export declare function merge<V, const Deps extends Dep<unknown>[], Args extends {
    [K in keyof Deps]: Deps[K] extends Dep<infer T> ? T : never;
}>(deps: Deps, fn: (...args: Args) => V): Binding<Variable<V>, "is_listening" | "is_polling" | Exclude<V extends (...args: any[]) => any ? never : "value", "g_type_instance">, V>;
export declare function derive<V, const Deps extends Variable<any>[], Args extends {
    [K in keyof Deps]: Deps[K] extends Variable<infer T> ? T : never;
}>(deps: Deps, fn: (...args: Args) => V): Variable<V>;
type B<T> = Binding<Variable<T>, any, T>;
export declare function watch<T>(init: T, objs: Array<Connectable | [obj: Connectable, signal?: string]>, callback: () => T): B<T>;
export declare function watch<T>(init: T, obj: Connectable, signal: string, callback: () => T): B<T>;
export declare function watch<T>(init: T, obj: Connectable, callback: () => T): B<T>;
export {};
