import { SessionRepository } from "@quiz/play/core/interactors/SessionRepository";
import { PlayEventBus } from "@quiz/play/core/interactors/PlayEventBus";

export interface SessionManager {
    getRepository(): SessionRepository
    getBus(): PlayEventBus
    clear(): void
}