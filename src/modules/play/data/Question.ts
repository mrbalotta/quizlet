import { Choice } from "@quiz/play/data/Choice";

export class Question {
    constructor(
        public readonly id: string,
        private readonly _choices: Choice[]
    ) {}

    get choices(): Choice[] {
        return [...this._choices]
    }
}