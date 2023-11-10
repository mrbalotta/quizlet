import { ScreenFactory } from "@infra/navigation/api/factory/ScreenFactory"
import { ScreenInfo } from '@infra/navigation/api/data/ScreenInfo'
import { ScreenGroupsRepository } from "@infra/navigation/api/mapper/ScreenGroupsRepository"
import { ScreenFactoryFactory } from "@infra/navigation/api/factory/ScreenFactoryFactory"

export type ConstructorType = new(groupName: string, infos: ScreenInfo[], initialRoute: string) => ScreenFactory 

export class ScreenFactoryFactoryImpl implements ScreenFactoryFactory {

    private factories: Map<string, ConstructorType> = new Map()

    register(groupName: string, factory: ConstructorType): ScreenFactoryFactory {
        this.factories.set(groupName, factory)
        return this
    }

    create(groups: ScreenGroupsRepository) {
        return (
            groups
                .getNames()
                .map(name => {
                    return { 
                        name: name, 
                        screens: groups.getScreensByGroup(name), 
                        initialRoute: groups.getGroupInitialRoute(name) 
                    }
                })
                .map(group => {
                    if(group && group.screens) {
                        const Constructor = this.factories.get(group.name)
                        if(Constructor) {
                            const factory = new Constructor(group.name, group.screens, group.initialRoute)
                            return factory.create()
                        }
                    }
                })
        )
    }
}