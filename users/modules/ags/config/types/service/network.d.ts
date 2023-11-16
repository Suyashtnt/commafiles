import "../gtk-types/gtk-3.0-ambient.js";
import "../gtk-types/gdk-3.0-ambient.js";
import "../gtk-types/cairo-1.0-ambient.js";
import "../gtk-types/gnomebluetooth-3.0-ambient.js";
import "../gtk-types/dbusmenugtk3-0.4-ambient.js";
import "../gtk-types/gobject-2.0-ambient.js";
import "../gtk-types/nm-1.0-ambient.js";
import "../gtk-types/soup-3.0-ambient.js";
import "../gtk-types/gvc-1.0-ambient.js";
import NM from 'gi://NM';
import Service from '../service.js';
declare class Wifi extends Service {
    private _client;
    private _device;
    private _ap;
    private _apBind;
    constructor(client: InstanceType<typeof NM.Client>, device: InstanceType<typeof NM.DeviceWifi>);
    scan(): void;
    private _activeAp;
    get access_points(): {
        bssid: string | null;
        address: string | null;
        lastSeen: number;
        ssid: string | null;
        active: boolean;
        strength: number;
        iconName: string | undefined;
    }[];
    get enabled(): boolean;
    set enabled(v: boolean);
    get strength(): number;
    get internet(): "connecting" | "connected" | "disconnected";
    get ssid(): string | null;
    get state(): "failed" | "disconnected" | "unmanaged" | "unavailable" | "prepare" | "config" | "need_auth" | "ip_config" | "ip_check" | "secondaries" | "activated" | "deactivating" | "unknown";
    get icon_name(): string;
}
declare class Wired extends Service {
    private _device;
    constructor(device: InstanceType<typeof NM.DeviceEthernet>);
    get speed(): number;
    get internet(): "connecting" | "connected" | "disconnected";
    get state(): "failed" | "disconnected" | "unmanaged" | "unavailable" | "prepare" | "config" | "need_auth" | "ip_config" | "ip_check" | "secondaries" | "activated" | "deactivating" | "unknown";
    get icon_name(): "network-wired-acquiring-symbolic" | "network-wired-symbolic" | "network-wired-no-route-symbolic" | "network-wired-disconnected-symbolic";
}
declare class Network extends Service {
    private _client;
    wifi: Wifi;
    wired: Wired;
    primary?: string;
    connectivity: string;
    constructor();
    toggleWifi(): void;
    private _getDevice;
    private _clientReady;
    private _sync;
}
declare const networkService: Network;
export default networkService;