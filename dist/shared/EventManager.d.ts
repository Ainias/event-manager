export declare class EventManager {
    private static _instance;
    private _listeners;
    private _lastListenerId;
    /**
     * @return {EventManager}
     */
    static getInstance(): any;
    constructor();
    addListener(event: any, listener: any): number;
    removeListener(event: any, listenerId: any): void;
    trigger(event: any, data: any): Promise<void>;
    static trigger(event: any, data: any): Promise<any>;
}
