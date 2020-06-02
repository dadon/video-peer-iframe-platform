(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Platform", "./events"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Platform_1 = require("./Platform");
    exports.Platform = Platform_1.default;
    var events_1 = require("./events");
    exports.PlatformEvents = events_1.PlatformEvents;
    exports.AppEvents = events_1.AppEvents;
});
