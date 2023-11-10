import { DIContainer, DIMapper } from "@infra/di/api";
import { ScreenGroups } from "@infra/navigation/impl/mapper/ScreenGroups";
import { ScreenGroupsRepository } from "@infra/navigation/api/mapper/ScreenGroupsRepository";

export default function main(di: DIContainer & DIMapper) {
    const factory = () => {
        return new ScreenGroups()
                .setGroupInitialRoute("default", "quiz/play/session")
    }

    di.single("NavigationMapper", factory)
      .single("ScreenGroupsRepository", () => {
          return  di.inject<ScreenGroupsRepository>("NavigationMapper")
      })
}