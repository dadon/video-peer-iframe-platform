import { EventEmitter } from "events";

import { AppEvents, PlatformEvents } from "./events";


class Platform extends EventEmitter {
    init(appId: string) {
        window.addEventListener("message", this.onMessage.bind(this));
        window.parent.postMessage({ from: appId, messageType: AppEvents.APP_READY }, "*");
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
