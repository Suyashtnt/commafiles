/// <reference types="@girs/gvc-1.0/gvc-1.0-ambient.js" />
import Service from '../service.js';
import Gvc from 'node_modules/@girs/gvc-1.0/gvc-1.0';
export declare class Stream extends Service {
    private _stream;
    private _ids;
    private _oldVolume;
    constructor(stream: Gvc.MixerStream);
    get application_id(): string | null;
    get stream(): Gvc.MixerStream;
    get description(): string | null;
    get icon_name(): string | null;
    get id(): number;
    get name(): string | null;
    get state(): string;
    get is_muted(): boolean;
    set is_muted(mute: boolean);
    get volume(): number;
    set volume(value: number);
    close(): void;
}
export declare class Audio extends Service {
    private _control;
    private _streams;
    private _streamBindings;
    private _speaker;
    private _microphone;
    private _speakerBinding;
    private _microphoneBinding;
    constructor();
    get control(): Gvc.MixerControl;
    get speaker(): Stream | undefined;
    set speaker(stream: Stream);
    get microphone(): Stream | undefined;
    set microphone(stream: Stream);
    get microphones(): Stream[];
    get speakers(): Stream[];
    get apps(): Stream[];
    get recorders(): Stream[];
    getStream(id: number): Stream | undefined;
    private _defaultChanged;
    private _streamAdded;
    private _streamRemoved;
    private _getStreams;
    private _notifyStreams;
}
declare const audio: Audio;
export default audio;
