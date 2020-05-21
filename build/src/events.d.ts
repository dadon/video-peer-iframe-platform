export declare enum PlatformEvents {
    APP_INIT = "APP_INIT",
    USER_JOIN = "USER_JOIN",
    USER_LEFT = "USER_LEFT"
}
export declare enum AppEvents {
    APP_READY = "APP_READY",
    APP_CREATED = "APP_CREATED",
    UPDATE_AVATAR = "UPDATE_AVATAR",
    UPDATE_SIZE = "UPDATE_SIZE",
    DEACTIVATE_JOIN = "DEACTIVATE_JOIN",
    PROXY_EVENT = "PROXY_EVENT"
}
export declare class ProxyEvent {
    private readonly target;
    private readonly eventType;
    private readonly handler;
    constructor(target: Window | Node, eventType: string, handler: (event: any) => void);
    destroy: () => void;
    _handler: (event: any) => void;
}
