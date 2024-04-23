export declare function isRunning(dbusName: string, bus: 'session' | 'system'): boolean;
export declare function parsePath(path: string): string;
export declare function init(configDir: string, entry: string): Promise<void>;
