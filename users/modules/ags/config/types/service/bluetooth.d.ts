import "../gtk-types/gtk-3.0-ambient.js";
import "../gtk-types/gdk-3.0-ambient.js";
import "../gtk-types/cairo-1.0-ambient.js";
import "../gtk-types/gnomebluetooth-3.0-ambient.js";
import "../gtk-types/dbusmenugtk3-0.4-ambient.js";
import "../gtk-types/gobject-2.0-ambient.js";
import "../gtk-types/nm-1.0-ambient.js";
import "../gtk-types/soup-3.0-ambient.js";
import "../gtk-types/gvc-1.0-ambient.js";
import Service from '../service.js';
declare const GnomeBluetooth: typeof import("../gtk-types/gnomebluetooth-3.0.js").GnomeBluetooth;
declare class BluetoothDevice extends Service {
    private _device;
    private _ids;
    private _connecting;
    get device(): import("../gtk-types/gnomebluetooth-3.0.js").GnomeBluetooth.Device;
    constructor(device: InstanceType<typeof GnomeBluetooth.Device>);
    close(): void;
    get address(): string | null;
    get alias(): string | null;
    get battery_level(): number;
    get battery_percentage(): number;
    get connected(): boolean;
    get icon_name(): string | null;
    get name(): string | null;
    get paired(): boolean;
    get trusted(): boolean;
    get type(): string | null;
    get connecting(): boolean;
    setConnection(connect: boolean): void;
}
declare class Bluetooth extends Service {
    private _client;
    private _devices;
    constructor();
    toggle(): void;
    private _getDevices;
    private _deviceAdded;
    private _deviceRemoved;
    connectDevice(device: BluetoothDevice, connect: boolean, callback: (s: boolean) => void): void;
    getDevice(address: string): BluetoothDevice | undefined;
    set enabled(v: boolean);
    get enabled(): boolean;
    get state(): string;
    get devices(): BluetoothDevice[];
    get connected_devices(): BluetoothDevice[];
}
declare const bluetoothService: Bluetooth;
export default bluetoothService;