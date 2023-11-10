import { HintStrategy } from "@quiz/play/core/interactors/HintStrategy";
import { PlayObserver } from "@quiz/play/core/interactors/PlayObserver";
import { SessionManager } from "@quiz/play/core/interactors/SessionManager";
import { SessionRepository } from "@quiz/play/core/interactors/SessionRepository";
import { Choice } from "@quiz/play/data/Choice";
import { Question } from "@quiz/play/data/Question";


export class HintStrategyImpl implements HintStrategy {
    private readonly maxHintsPerQuestion = 2
    private hintsPerQuestionCounter: Map<string, number> = new Map()

    constructor(
        private sessionManager: SessionManager
    ) {}

    async hint(): Promise<void> {
        const question = await this.getRepository().getCurrentQuestion()
        if(await this.isHintAvailableForQuestion(question)) {
            this.revealOneIncorrectChoice(question)
            const count = this.updateHintsCounterForQuestion(question)
            this.getBus().notify('questionUpdated', question)
            this.getBus().notify('hinted', count)
        }
    }

    private async isHintAvailableForQuestion(question: Question): Promise<boolean> {
        const hintsAvailable = await this.getRepository().findPowerUpQuantityByType('hint')
        if(hintsAvailable > 0) {
            let count = this.hintsPerQuestionCounter.get(question.id) ?? 0
            return count > this.maxHintsPerQuestion
        }
        return false
    }

    private updateHintsCounterForQuestion(question: Question): number {
        let count = this.hintsPerQuestionCounter.get(question.id) ?? 0
        count++
        this.hintsPerQuestionCounter.set(question.id, count)
        return count
    }

    private revealOneIncorrectChoice(question: Question) {
        this.shuffle(question.choices).find(choice => {
            if(!choice.correct && choice.concealed) {
                choice.concealed = false
                return
            }
        })
    }

    private shuffle(array: Choice[]) {
        let currentIndex = array.length, randomIndex;
      
        while (currentIndex > 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

    private getRepository(): SessionRepository {
        return this.sessionManager.getRepository()
    }

    private getBus(): PlayObserver {
        return this.sessionManager.getBus()
    }
}