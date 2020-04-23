import { EventEmitter } from "events";

import { AppEvents, PlatformEvents } from "./events";


class Platform extends EventEmitter {
    init() {
        window.addEventListener("message", this.onMessage.bind(this));
        this.sendMessage(AppEvents.APP_READY);
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

    private onMessage(event: MessageEvent) {
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
    }
}

export default new Platform();
