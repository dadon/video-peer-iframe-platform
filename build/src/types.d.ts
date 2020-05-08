export interface User {
    id: string;
    color: string;
    name?: string;
    picture?: string;
}
export interface AppInitEvent {
    roomId: string;
    user: User;
}
