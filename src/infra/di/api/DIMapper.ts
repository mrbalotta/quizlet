export interface DIMapper {
    single<T>(token: string, factory: () => T, allowOverride?: boolean): DIMapper
    factory<T>(token: string, factory: () => T, allowOverride?: boolean): DIMapper
}

export class AmbiguousMappingException extends Error {
    constructor(token: string) {
        super(`token '${token}' has been mapped more than once`)
    }
}