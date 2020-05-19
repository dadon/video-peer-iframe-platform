export declare enum PlatformEvents {
    APP_INIT = "APP_INIT",
    UPDATE_USERS_STATE = "UPDATE_USERS_STATE",
    USER_JOIN = "USER_JOIN",
    USER_LEFT = "USER_LEFT",
    APP_MOVE = "APP_MOVE"
}
export declare enum AppEvents {
    APP_READY = "APP_READY",
    PROXY_EVENT = "PROXY_EVENT",
    APP_CREATED = "APP_CREATED",
    SET_USER_STATE = "SET_USER_STATE",
    UPDATE_AVATAR = "UPDATE_AVATAR",
    UPDATE_SIZE = "UPDATE_SIZE"
}
export declare class ProxyEvent {
    private readonly target;
    private readonly eventType;
    private readonly handler;
    constructor(target: Window | Node, eventType: string, handler: (event: any) => void);
    destroy: () => void;
    _handler: (event: any) => void;
}
