export enum PlatformEvents {
    APP_INIT = "APP_INIT",
    USER_JOIN = "USER_JOIN",
    USER_LEFT = "USER_LEFT",
}

export enum AppEvents {
    APP_READY = "APP_READY",
    APP_CREATED = "APP_CREATED",
    UPDATE_AVATAR = "UPDATE_AVATAR",
    UPDATE_SIZE = "UPDATE_SIZE",
    DEACTIVATE_JOIN = "DEACTIVATE_JOIN",
    PROXY_EVENT = "PROXY_EVENT",
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
