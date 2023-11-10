import { PlayObserver } from "@quiz/play/core/interactors/PlayObserver";
import { QuestionStrategy } from "@quiz/play/core/interactors/QuestionStrategy";
import { SessionManager } from "@quiz/play/core/interactors/SessionManager";
import { SessionRepository } from "@quiz/play/core/interactors/SessionRepository";
import { SkipQuestionStrategy } from "@quiz/play/core/interactors/SkipQuestionStrategy";


export class SkipQuestionStrategyImpl implements SkipQuestionStrategy {
    
    constructor(
        private sessionManager: SessionManager,
        private questionStrategy: QuestionStrategy
    ) {}
    
    async skip(): Promise<void> {
        let quantity = await this.getRepository().findPowerUpQuantityByType('skip')
        if(quantity > 0) {
            quantity--
            await this.questionStrategy.next()
            await this.getRepository().updatePowerUpQuantityByType('skip', quantity)
            this.getBus().notify('skipped', quantity)
        }
    }

    private getRepository(): SessionRepository {
        return this.sessionManager.getRepository()
    }

    private getBus(): PlayObserver {
        return this.sessionManager.getBus()
    }
}