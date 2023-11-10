export interface DIContainer {
    inject<T>(token: string): T
}

export class TokenNotMappedException extends Error {
    constructor(token: string) {
        super(`token '${token}' has not been mapped`)
    }
}

export class DIContainerNotCreatedException extends Error {
    constructor() {
        super("DI container has not been created")
    }
}