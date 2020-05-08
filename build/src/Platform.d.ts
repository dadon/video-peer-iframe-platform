/// <reference types="node" />
import { EventEmitter } from "events";
import { AppEvents, PlatformEvents } from "./events";
interface AppOptions {
    width?: number;
    height?: number;
    needJoin?: boolean;
    waitForCreation?: boolean;
}
declare class Platform extends EventEmitter {
    init(options?: AppOptions): void;
    sendMessage(type: AppEvents | PlatformEvents, data?: any): void;
    private onMessage;
}
declare const _default: Platform;
export default _default;
