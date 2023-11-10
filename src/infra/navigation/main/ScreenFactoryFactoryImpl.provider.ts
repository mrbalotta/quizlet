import { DIContainer, DIMapper } from "@infra/di/api";
import { ScreenFactoryFactoryImpl } from "@infra/navigation/impl/react/factory/ScreenFactoryFactoryImpl";
import { StackNavFactory } from "@infra/navigation/impl/react/factory/StackNavFactory";

export default function main(di: DIContainer & DIMapper) {

    const factory = () => {
        return new ScreenFactoryFactoryImpl()
                .register("default", StackNavFactory)
    }

    di.single("ScreenFactoryFactory", factory)
}