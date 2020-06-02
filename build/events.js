(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var PlatformEvents;
    (function (PlatformEvents) {
        PlatformEvents["APP_INIT"] = "APP_INIT";
        PlatformEvents["USER_JOIN"] = "USER_JOIN";
        PlatformEvents["USER_LEFT"] = "USER_LEFT";
    })(PlatformEvents = exports.PlatformEvents || (exports.PlatformEvents = {}));
    var AppEvents;
    (function (AppEvents) {
        AppEvents["APP_READY"] = "APP_READY";
        AppEvents["APP_CREATED"] = "APP_CREATED";
        AppEvents["UPDATE_AVATAR"] = "UPDATE_AVATAR";
        AppEvents["UPDATE_SIZE"] = "UPDATE_SIZE";
        AppEvents["DEACTIVATE_JOIN"] = "DEACTIVATE_JOIN";
        AppEvents["PROXY_EVENT"] = "PROXY_EVENT";
    })(AppEvents = exports.AppEvents || (exports.AppEvents = {}));
    class ProxyEvent {
        constructor(target, eventType, handler) {
            this.target = target;
            this.eventType = eventType;
            this.handler = handler;
            this.destroy = () => {
                this.target.removeEventListener(this.eventType, this._handler);
            };
            this._handler = (event) => {
                this.handler(event);
            };
            target.addEventListener(eventType, this._handler);
        }
    }
    exports.ProxyEvent = ProxyEvent;
});
