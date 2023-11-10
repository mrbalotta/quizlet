import { ScreenInfo } from "@infra/navigation/api/data/ScreenInfo";

export interface ScreenGroupsRepository {
    getScreenByRoute(route: string): ScreenInfo | undefined
    getScreensByGroup(groupName: string): ScreenInfo[] | undefined
    getNames(): string[]
    setGroupInitialRoute(group: string, initialRoute: string): void
    getGroupInitialRoute(group: string): string
}