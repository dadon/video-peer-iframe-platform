export enum PlatformEvents {
    APP_INIT = "APP_INIT",
    UPDATE_USERS_STATE = "UPDATE_USERS_STATE",
    USER_JOIN = "USER_JOIN",
    USER_LEFT = "USER_LEFT",
    APP_MOVE = "APP_MOVE",
}

export enum AppEvents {
    APP_READY = "APP_READY",
    PROXY_EVENT = "PROXY_EVENT",
    APP_CREATED = "APP_CREATED",
    SET_USER_STATE = "SET_USER_STATE",
    UPDATE_AVATAR = "UPDATE_AVATAR",
    UPDATE_SIZE = "UPDATE_SIZE",
}

export class ProxyEvent {
    constructor(private readonly target: Window | Node,
                private readonly eventType: string,
                private readonly handler: (event: any) => void) {
        target.addEventListener(eventType, this._handler);
    }

    destroy = () => {
        this.target.removeEventListener(this.eventType, this._handler);
    }

    _handler = (event: any) => {
        this.handler(event);
    }
}
