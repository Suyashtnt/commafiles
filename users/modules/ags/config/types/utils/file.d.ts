/// <reference types="@girs/gio-2.0/gio-2.0-ambient" />
/// <reference types="@girs/gtk-3.0/node_modules/@girs/gio-2.0/gio-2.0-ambient" />
/// <reference types="@girs/nm-1.0/node_modules/@girs/gio-2.0/gio-2.0-ambient" />
import Gio from 'node_modules/@girs/gio-2.0/gio-2.0';
export declare function readFile(file: string | Gio.File): string;
export declare function readFileAsync(file: string | Gio.File): Promise<string>;
export declare function writeFile(string: string, path: string): Promise<Gio.File>;
export declare function monitorFile(path: string, callback?: (file: Gio.File, event: Gio.FileMonitorEvent) => void, type?: 'file' | 'directory', flags?: Gio.FileMonitorFlags): Gio.FileMonitor | null;
