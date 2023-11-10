import { PlayEventBus } from "@quiz/play/core/interactors/PlayEventBus";
import { PlayObserver } from "@quiz/play/core/interactors/PlayObserver";
import { RewardStrategy } from "@quiz/play/core/interactors/RewardStrategy";
import { SessionManager } from "@quiz/play/core/interactors/SessionManager";
import { SessionRepository } from "@quiz/play/core/interactors/SessionRepository";
import { Choice } from "@quiz/play/data/Choice";


export class CoinRewardStrategy implements RewardStrategy {

    constructor(private readonly sessionManager: SessionManager) {}

    async calculate(choice: Choice): Promise<void> {
        if(choice.correct) {
            let quantity = await this.getRepository().findRewardQuantityByType('coin')
            quantity += 5
            await this.getRepository().updatePowerUpQuantityByType('coin', quantity)
            this.getBus().notify('coinUpdated', quantity)
        }
    }

    private getRepository(): SessionRepository {
        return this.sessionManager.getRepository()
    }

    private getBus(): PlayObserver {
        return this.sessionManager.getBus()
    }
}