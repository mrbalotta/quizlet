import { RewardStrategy } from "@quiz/play/core/interactors/RewardStrategy";
import { SessionManager } from "@quiz/play/core/interactors/SessionManager";
import { Choice } from "@quiz/play/data/Choice";

export class AtLeastGoalStrategy implements RewardStrategy {
    
    constructor(
        private sessionManager: SessionManager
    ) {}

    async calculate(choice: Choice): Promise<void> {
        const 
    }
}