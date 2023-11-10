import { DIContainer, DIMapper } from "@infra/di/api";
import { NavDefaultTree } from "@infra/navigation/impl/react/factory/NavDefaultTreeFactory";
import { ScreenFactoryFactory } from "@infra/navigation/api/factory/ScreenFactoryFactory";
import { ScreenGroupsRepository } from "@infra/navigation/api/mapper/ScreenGroupsRepository";

export default function main(di: DIContainer & DIMapper) {

    const factory = () => {
        const screenFactoryFactory = di.inject<ScreenFactoryFactory>("ScreenFactoryFactory")
        const screenGroupsRepository = di.inject<ScreenGroupsRepository>("ScreenGroupsRepository")

        return new NavDefaultTree(screenFactoryFactory, screenGroupsRepository)
    }

    di.single("NavTreeFactory", factory)
}