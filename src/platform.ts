import { EventEmitter } from "events";

import { AppEvents, PlatformEvents, ProxyEvent } from "./events";


interface AppOptions {
    width?: number;
    height?: number;
    needJoin?: boolean;
    waitForCreation?: boolean;
    disableProxyEvents?: boolean;
    helpUrl?: string;
    resizable?: boolean;
}

class Platform extends EventEmitter {
    proxyEvents: ProxyEvent[];

    init(options?: AppOptions) {
        window.addEventListener("message", this.onMessage);

        if (!options.disableProxyEvents) {
            this.proxyEvents = [];
            this.createProxyEventHandler(window, "wheel", ["deltaY"]);
            this.createProxyEventHandler(document, "mouseup", []);
            this.createProxyEventHandler(document, "mousemove", ["clientX", "clientY"]);
        }

        this.sendMessage(AppEvents.APP_READY, options);
    }

    destroy() {
        window.removeEventListener("message", this.onMessage);

        if (this.proxyEvents && this.proxyEvents.length) {
            for (let el of this.proxyEvents) {
                el.destroy();
            }

            this.proxyEvents = undefined;
        }
    }

    sendMessage(type: AppEvents | PlatformEvents, data?: any) {
        const message: any = {
            from: "platformApp",
            messageType: type,
        };

        if (data) {
            message.data = data;
        }

        window.parent.postMessage(message, "*");
    }

    private onMessage = (event: MessageEvent) => {
        const { data } = event;
        const { messageType } = data;

        if (data["from"] !== "platform") {
            return;
        }

        if (Object.keys(PlatformEvents).indexOf(messageType) === -1) {
            console.warn(`Unknown event received - ${messageType}`);
            return;
        }

        this.emit(messageType, data);
    };

    private createProxyEventHandler = (target: Window | Node, type: string, attributesToCopy: string[]) => {
        this.proxyEvents.push(new ProxyEvent(target, type, (event: any) => {
            const payload: any = {};
            for (let attr of attributesToCopy) {
                payload[attr] = event[attr];
            }
            this.sendMessage(AppEvents.PROXY_EVENT, {
                type,
                payload,
            });
        }));
    };
}

export default new Platform();
