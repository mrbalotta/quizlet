import { NavigationMapper } from '@infra/navigation/api/mapper/NavigationMapper';
import { ScreenInfo } from '@infra/navigation/api/data/ScreenInfo';
import { ScreenGroupsRepository } from '@infra/navigation/api/mapper/ScreenGroupsRepository';


export class ScreenGroups implements NavigationMapper, ScreenGroupsRepository {

    private routes: Map<String, ScreenInfo> = new Map()
    private groups: Map<string, ScreenInfo[]> = new Map()
    private configs: Map<string, string> = new Map()

    addScreen(info: ScreenInfo): NavigationMapper {
        this.addGroup(info)
        this.addRoute(info)
        console.log(`\t\troute: ${info.getRoute()} added to group: ${info.getGroupName()}`)
        return this
    }

    getScreenByRoute(route: string): ScreenInfo | undefined {
        return this.routes.get(route)
    }

    getScreensByGroup(groupName: string): ScreenInfo[] | undefined {
        return this.groups.get(groupName)
    }

    getNames() {
        return [...this.groups.keys()]
    }

    setGroupInitialRoute(group: string, initialRoute: string) {
        this.configs.set(group, initialRoute)
        return this
    }

    getGroupInitialRoute(group: string): string {
        return this.configs.get(group) || ""
    }

    private addGroup(info: ScreenInfo) {
        const groupName = info.getGroupName()
        if (!this.groups.has(groupName)) this.groups.set(groupName, [])
        this.groups.get(groupName)!!.push(info)
    }

    private addRoute(info: ScreenInfo) {
        this.routes.set(info.getRoute(), info)
    }

    print() {
        this.groups.forEach((screens, name) => {
            console.log(`group: ${name}`)
            screens.forEach(screen => {
                console.log(`  screen route: ${screen.getRoute()}`)
            })
        })
    }
}
