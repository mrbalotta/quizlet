import { AnswerEvaluationStrategy } from "@quiz/play/core/interactors/AnswerEvaluationStrategy";
import { HintStrategy } from "@quiz/play/core/interactors/HintStrategy";
import { PlayObserver } from "@quiz/play/core/interactors/PlayObserver";
import { QuestionStrategy } from "@quiz/play/core/interactors/QuestionStrategy";
import { SessionManager } from "@quiz/play/core/interactors/SessionManager";
import { SkipQuestionStrategy } from "@quiz/play/core/interactors/SkipQuestionStrategy";
import { Choice } from "@quiz/play/data/Choice";



export class PlayControllerImpl {
    private readonly throttlingTime = 1000
    private throttleSkip = false
    private throttleHint = false
    
    constructor(
        private answerEvaluationStrategy: AnswerEvaluationStrategy,
        private skipQuestionStrategy: SkipQuestionStrategy,
        private hintStrategy: HintStrategy,
        private questionStrategy: QuestionStrategy,
        private sessionManager: SessionManager
    ) {}

    async answer(choice: Choice) {
        if(await this.isGameOver()) return
        await this.answerEvaluationStrategy.evaluate(choice)
    }

    async skipQuestion() {
        if(await this.isGameOver()) return
        if(!this.throttleSkip) {
            this.throttleSkip = true
            await this.skipQuestionStrategy.skip()
            setTimeout(() => this.throttleSkip = false, this.throttlingTime)
        }
    }

    async nextQuestion() {
        if(await this.isGameOver()) return
        await this.questionStrategy.next()
    }

    async hint() {
        if(await this.isGameOver()) return
        if(!this.throttleHint) {
            await this.hintStrategy.hint()
            setTimeout(() => this.throttleHint = false, this.throttlingTime)
        }
    }
    
    register(event: string, observer: (event: string, data?: any) => void): void {
        this.sessionManager.getBus().register(event, observer)
    }

    private async isGameOver(): Promise<boolean> {
        return await this.sessionManager.getRepository().isGameOver()
    }
}