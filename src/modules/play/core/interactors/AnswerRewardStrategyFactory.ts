import { RewardStrategy } from "@quiz/play/core/interactors/RewardStrategy";


export interface AnswerRewardStrategyFactory {
    create(): readonly RewardStrategy[]
}