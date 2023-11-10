import { Choice } from "@quiz/play/data/Choice";


export interface AnswerEvaluationStrategy {
    evaluate(choice: Choice): Promise<void>
}