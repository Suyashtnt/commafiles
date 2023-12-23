/// <reference types="@girs/glib-2.0/glib-2.0-ambient" />
/// <reference types="@girs/gtk-3.0/node_modules/@girs/glib-2.0/glib-2.0-ambient" />
/// <reference types="@girs/gtk-3.0/node_modules/@girs/harfbuzz-0.0/node_modules/@girs/glib-2.0/glib-2.0-ambient" />
import GLib from 'node_modules/@girs/glib-2.0/glib-2.0';
export type FetchOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: string;
    headers?: Record<string, string>;
};
export declare function fetch(url: string, options?: FetchOptions): Promise<{
    status: number;
    statusText: string | null;
    ok: boolean;
    type: string;
    json(): Promise<any>;
    text(): Promise<string>;
    arrayBuffer(): Promise<ArrayBufferLike>;
    gBytes(): Promise<GLib.Bytes>;
}>;
