import { ScreenInfo } from "@infra/navigation/api/data/ScreenInfo";
import { ScreenFactory } from "@infra/navigation/api/factory/ScreenFactory";
import { ScreenGroupsRepository } from "@infra/navigation/api/mapper/ScreenGroupsRepository";

export type ConstructorType = new(groupName: string, infos: ScreenInfo[], initialRoute: string) => ScreenFactory 

export interface ScreenFactoryFactory {
    register(groupName: string, factory: ConstructorType): ScreenFactoryFactory
    create(groups: ScreenGroupsRepository): React.ReactNode
}