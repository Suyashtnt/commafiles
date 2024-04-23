/// <reference types="@girs/nm-1.0/nm-1.0-ambient.js" />
import NM from 'node_modules/@girs/nm-1.0/nm-1.0';
import Service from '../service.js';
export declare class Wifi extends Service {
    private _client;
    private _device;
    private _ap;
    private _apBind;
    constructor(client: NM.Client, device: NM.DeviceWifi);
    readonly scan: () => void;
    private _activeAp;
    get access_points(): {
        bssid: string | null;
        address: string | null;
        lastSeen: number;
        ssid: string | null;
        active: boolean;
        strength: number;
        frequency: number;
        iconName: string | undefined;
    }[];
    get enabled(): boolean;
    set enabled(v: boolean);
    get strength(): number;
    get frequency(): number;
    get internet(): "connecting" | "connected" | "disconnected";
    get ssid(): string | null;
    get state(): "failed" | "disconnected" | "unmanaged" | "unavailable" | "prepare" | "config" | "need_auth" | "ip_config" | "ip_check" | "secondaries" | "activated" | "deactivating" | "unknown";
    get icon_name(): string;
}
export declare class Wired extends Service {
    private _device;
    constructor(device: NM.DeviceEthernet);
    get speed(): number;
    get internet(): "connecting" | "connected" | "disconnected";
    get state(): "failed" | "disconnected" | "unmanaged" | "unavailable" | "prepare" | "config" | "need_auth" | "ip_config" | "ip_check" | "secondaries" | "activated" | "deactivating" | "unknown";
    get icon_name(): "network-wired-acquiring-symbolic" | "network-wired-symbolic" | "network-wired-no-route-symbolic" | "network-wired-disconnected-symbolic";
}
export type ActiveVpnConnection = null | NM.VpnConnection;
export declare class VpnConnection extends Service {
    private _vpn;
    private _connection;
    private _id;
    private _activeConnection;
    private _state;
    private _stateBind;
    private _vpnState;
    private _vpnStateBind;
    get connection(): NM.Connection;
    get active_connection(): ActiveVpnConnection;
    get uuid(): string;
    get id(): string;
    get state(): "connecting" | "connected" | "disconnected" | "disconnecting";
    get vpn_state(): "failed" | "disconnected" | "prepare" | "ip_config" | "activated" | "unknown" | "needs_auth" | "connect";
    get icon_name(): "network-vpn-symbolic" | "network-vpn-disabled-symbolic" | "network-vpn-acquiring-symbolic";
    constructor(vpn: Vpn, connection: NM.RemoteConnection);
    private _updateId;
    private _updateState;
    private _updateVpnState;
    readonly updateActiveConnection: (activeConnection: ActiveVpnConnection) => void;
    readonly setConnection: (connect: boolean) => void;
}
export declare class Vpn extends Service {
    private _client;
    private _connections;
    constructor(client: NM.Client);
    private _connectionAdded;
    private _connectionRemoved;
    readonly activateVpnConnection: (vpn: VpnConnection) => void;
    readonly deactivateVpnConnection: (vpn: VpnConnection) => void;
    readonly getConnection: (uuid: string) => VpnConnection | undefined;
    get connections(): VpnConnection[];
    get activated_connections(): VpnConnection[];
}
export declare class Network extends Service {
    private _client;
    wifi: Wifi;
    wired: Wired;
    primary: null | 'wifi' | 'wired';
    connectivity: string;
    vpn: Vpn;
    constructor();
    readonly toggleWifi: () => void;
    private _getDevice;
    private _clientReady;
    private _sync;
}
declare const network: Network;
export default network;
