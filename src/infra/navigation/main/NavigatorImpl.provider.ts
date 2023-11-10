import { DIContainer, DIMapper } from "@infra/di/api";
import { ScreenGroupsRepository } from "@infra/navigation/api/mapper/ScreenGroupsRepository";
import { NavigatorImpl } from "@infra/navigation/impl/react/client/NavigatorImpl";

export default function main(di: DIContainer & DIMapper) {
    const factory = () => {
        const screenGroupsRepository = di.inject<ScreenGroupsRepository>("ScreenGroupsRepository")
        return new NavigatorImpl(screenGroupsRepository)
    }
    
    di.single("Navigator", factory)
}