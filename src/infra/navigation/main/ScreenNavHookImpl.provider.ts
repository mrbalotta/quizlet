import { DIContainer, DIMapper } from "@infra/di/api";
import { ScreenNavHookImpl } from "@infra/navigation/impl/react/client/ScreenNavHookImpl";

export default function main(di: DIContainer & DIMapper) {
    di.single("ScreenNavHook", () => new ScreenNavHookImpl())
}