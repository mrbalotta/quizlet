export interface HintStrategy {
    hint(): Promise<void>
}