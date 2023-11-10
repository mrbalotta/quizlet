import { AnswerEvaluationStrategy } from "@quiz/play/core/interactors/AnswerEvaluationStrategy";
import { PlayObserver } from "@quiz/play/core/interactors/PlayObserver";
import { AnswerRewardStrategyFactory } from "@quiz/play/core/interactors/AnswerRewardStrategyFactory";
import { SessionRepository } from "@quiz/play/core/interactors/SessionRepository";
import { Choice } from "@quiz/play/data/Choice";
import { SessionManager } from "@quiz/play/core/interactors/SessionManager";
import { PlayEventBus } from "@quiz/play/core/interactors/PlayEventBus";


export class AnswerEvaluationStrategyImpl implements AnswerEvaluationStrategy {
    
    constructor(
        private readonly factory: AnswerRewardStrategyFactory,
        private readonly sessionManager: SessionManager
    ) {}

    async evaluate(choice: Choice): Promise<void> {
        if(!choice.correct) {   
            await this.getRepository().setGameOver()
            this.getBus().notify('lost', true)
        } else {
            this.sessionManager.getRepository().updateCorrectAnswerCounter()
            const rewardStrategies = this.factory.create()
            for(const index in rewardStrategies) {
                await rewardStrategies[index].calculate(choice)
            }
        }
    }

    private getBus(): PlayEventBus {
        return this.sessionManager.getBus()
    }

    private getRepository(): SessionRepository {
        return this.sessionManager.getRepository()
    }
}