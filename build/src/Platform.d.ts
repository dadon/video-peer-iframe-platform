/// <reference types="node" />
import { EventEmitter } from "events";
import { AppEvents, PlatformEvents, ProxyEvent } from "./events";
interface AppOptions {
    width?: number;
    height?: number;
    needJoin?: boolean;
    waitForCreation?: boolean;
    disableProxyEvents?: boolean;
}
declare class Platform extends EventEmitter {
    proxyEvents: ProxyEvent[];
    init(options?: AppOptions): void;
    destroy(): void;
    sendMessage(type: AppEvents | PlatformEvents, data?: any): void;
    private onMessage;
    private createProxyEventHandler;
}
declare const _default: Platform;
export default _default;
