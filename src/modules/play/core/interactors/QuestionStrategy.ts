export interface QuestionStrategy {
    next(): Promise<void>
}