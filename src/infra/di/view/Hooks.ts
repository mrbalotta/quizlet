import { useContext, useRef } from "react";
import { DIContext } from "@infra/di/view/DIContext";
import { DIContainerNotCreatedException } from "@infra/di/api";


export function useDI() {
    const di = useContext(DIContext)
    if(!di) throw new DIContainerNotCreatedException()
    return di
}

export function useInject<T>(token: string) {
    const di = useDI()
    return useRef(di.inject<T>(token)).current
}