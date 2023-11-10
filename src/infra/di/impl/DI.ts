import { 
    DIContainer, 
    DIMapper, 
    AmbiguousMappingException, 
    TokenNotMappedException 
} from "@infra/di/api";


export class DI implements DIContainer, DIMapper {
    private static instance = new DI()
    private map: Map<string, DIFactory> = new Map()

    private constructor() {}

    static getInstance() {
        return this.instance
    }

    inject<T>(token: string): T {
        const diFactory = this.map.get(token)
        if(!diFactory) throw new TokenNotMappedException(token)
        return diFactory.create() as T
    }

    single<T>(token: string, factory: () => T, allowOverride = false): DIMapper {
        this.guard(token)
        this.map.set(token, new SingleFactory(factory, allowOverride))
        return this
    }

    factory<T>(token: string, factory: () => T, allowOverride = false): DIMapper {
        this.guard(token)
        this.map.set(token, new DIFactory(factory, allowOverride))
        return this
    }

    private guard(token: string) {
        const diFactory = this.map.get(token)
        if(diFactory && !diFactory.isOverrideAllowed()) throw new AmbiguousMappingException(token)
    }
}

class DIFactory {
    constructor(private factory: () => any, private allowOverride: boolean) {}

    create(): any {
        return Object.seal(this.factory())
    }

    isOverrideAllowed(): boolean {
        return this.allowOverride
    }
}

class SingleFactory extends DIFactory {
    private value: any | null = null
    
    constructor(factory: () => any, allowOverride: boolean) {
        super(factory, allowOverride)
    }

    create(): any {
        if(this.value == null) this.value = super.create()
        return this.value
    }
}