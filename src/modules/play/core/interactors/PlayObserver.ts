export interface PlayObserver {
    notify(event: string, data?: any): void
}