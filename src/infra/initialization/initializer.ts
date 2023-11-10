import { DIContainer, DIMapper } from "@infra/di/api";

export function initializer(di: DIContainer & DIMapper, providers: ((di: DIContainer & DIMapper) => void)[]) {
    for(const provider in providers) {
        providers[provider](di)
    }
}