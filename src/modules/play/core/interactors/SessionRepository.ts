import { Question } from "@quiz/play/data/Question"

export interface SessionRepository {
    isGameOver(): Promise<boolean>
    setGameOver(): Promise<void>
    getCurrentQuestion(): Promise<Question>
    findPowerUpQuantityByType(type: string): Promise<number>
    updatePowerUpQuantityByType(type: string, quantity: number): Promise<void>
    findRewardQuantityByType(type: string): Promise<number>
    updateRewardQuantityByType(type: string, quantity: number): Promise<void>
    updateCorrectAnswerCounter(): Promise<void>
    getCorretAnswerCounter(): Promise<number>
    clear(): void
}