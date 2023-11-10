import { Question } from "@quiz/play/data/Question";

export interface questionRepository {
    next(): Promise<Question>
}