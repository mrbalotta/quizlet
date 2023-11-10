import * as modules from "@main/entrypoints/modules"
import * as infra from '@main/entrypoints/infra'

import { DI } from '@infra/di/impl/DI';
import { initializer } from "@infra/initialization/initializer";

export * from '@main/application/App'

export default function main() {
    startInfra()
    startModules()
}

function startModules() {
    console.log("starting modules...")
    initializer(DI.getInstance(), modules)
    console.log("modules started")
}

function startInfra() {
    console.log("starting infra...")
    initializer(DI.getInstance(), infra)
    console.log("infra started")
}