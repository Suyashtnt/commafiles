import Service from '../service.js';
export declare class Active extends Service {
    updateProperty(prop: string, value: unknown): void;
}
export declare class ActiveClient extends Active {
    private _address;
    private _title;
    private _class;
    get address(): string;
    get title(): string;
    get class(): string;
}
export declare class ActiveWorkspace extends Active {
    private _id;
    private _name;
    get id(): number;
    get name(): string;
}
export declare class Actives extends Service {
    constructor();
    private _client;
    private _monitor;
    private _workspace;
    get client(): ActiveClient;
    get monitor(): string;
    get workspace(): ActiveWorkspace;
}
export declare class Hyprland extends Service {
    private _active;
    private _monitors;
    private _workspaces;
    private _clients;
    private _decoder;
    private _encoder;
    get active(): Actives;
    get monitors(): object[];
    get workspaces(): object[];
    get clients(): object[];
    getMonitor(id: number): object | undefined;
    getWorkspace(id: number): object | undefined;
    getClient(address: string): object | undefined;
    constructor();
    private _watchSocket;
    sendMessage(cmd: string): Promise<string>;
    private _syncMonitors;
    private _syncWorkspaces;
    private _syncClients;
    private _onEvent;
}
export declare const hyprland: Hyprland;
export default hyprland;
