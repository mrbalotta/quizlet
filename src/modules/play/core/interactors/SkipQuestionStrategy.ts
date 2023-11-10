export interface SkipQuestionStrategy {
    skip(): Promise<void>
}