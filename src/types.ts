export interface User {
    id: string;
    color: string;
    name?: string;
}

export interface AppInitEvent {
    user: User;
    roomId: string;
    appId: string;
    joined: boolean;
    sessionData: any;
}
