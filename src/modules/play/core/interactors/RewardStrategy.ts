import { Choice } from "@quiz/play/data/Choice";


export interface RewardStrategy {
    calculate(choice: Choice): Promise<void>
}