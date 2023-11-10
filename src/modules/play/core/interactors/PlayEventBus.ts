import { PlayObserver } from "@quiz/play/core/interactors/PlayObserver";

export interface PlayEventBus extends PlayObserver {
    register(event: string, observer: (data: any) => void): void
    clear(): void
}