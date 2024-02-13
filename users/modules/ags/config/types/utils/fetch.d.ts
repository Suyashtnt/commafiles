/// <reference types="@girs/gio-2.0/gio-2.0-ambient" />
/// <reference types="@girs/gtk-3.0/node_modules/@girs/gio-2.0/gio-2.0-ambient" />
/// <reference types="@girs/nm-1.0/node_modules/@girs/gio-2.0/gio-2.0-ambient" />
/// <reference types="@girs/glib-2.0/glib-2.0-ambient" />
/// <reference types="@girs/gtk-3.0/node_modules/@girs/glib-2.0/glib-2.0-ambient" />
/// <reference types="@girs/gtk-3.0/node_modules/@girs/harfbuzz-0.0/node_modules/@girs/glib-2.0/glib-2.0-ambient" />
import GLib from 'node_modules/@girs/glib-2.0/glib-2.0';
import Gio from 'node_modules/@girs/gio-2.0/gio-2.0';
export type FetchOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: string;
    headers?: Record<string, string>;
    params?: Record<string, any>;
};
export declare class Response {
    status: number;
    statusText: string | null;
    ok: boolean;
    stream: Gio.InputStream | null;
    type: string;
    constructor(status: number, statusText: string | null, ok: boolean, stream: Gio.InputStream | null);
    json(): Promise<any>;
    text(): Promise<string>;
    arrayBuffer(): Promise<ArrayBuffer | null>;
    gBytes(): Promise<GLib.Bytes | null>;
}
export declare function fetch(url: string, options?: FetchOptions): Promise<Response>;
