(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "events", "./events"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const events_1 = require("events");
    const events_2 = require("./events");
    class Platform extends events_1.EventEmitter {
        constructor() {
            super(...arguments);
            this.onMessage = (event) => {
                const { data } = event;
                const { messageType } = data;
                if (data["from"] !== "platform") {
                    return;
                }
                if (Object.keys(events_2.PlatformEvents).indexOf(messageType) === -1) {
                    console.warn(`Unknown event received - ${messageType}`);
                    return;
                }
                this.emit(messageType, data);
            };
            this.createProxyEventHandler = (target, type, attributesToCopy) => {
                this.proxyEvents.push(new events_2.ProxyEvent(target, type, (event) => {
                    const payload = {};
                    for (let attr of attributesToCopy) {
                        payload[attr] = event[attr];
                    }
                    this.sendMessage(events_2.AppEvents.PROXY_EVENT, {
                        type,
                        payload,
                    });
                }));
            };
        }
        init(options) {
            window.addEventListener("message", this.onMessage);
            if (!options.disableProxyEvents) {
                this.proxyEvents = [];
                this.createProxyEventHandler(window, "wheel", ["deltaY"]);
                this.createProxyEventHandler(document, "mouseup", []);
                this.createProxyEventHandler(document, "mousemove", ["clientX", "clientY"]);
            }
            this.sendMessage(events_2.AppEvents.APP_READY, options);
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
        sendMessage(type, data) {
            const message = {
                from: "platformApp",
                messageType: type,
            };
            if (data) {
                message.data = data;
            }
            window.parent.postMessage(message, "*");
        }
    }
    exports.default = new Platform();
});
