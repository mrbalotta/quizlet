export interface ScreenNavHook {
    useFocusEffect(fn: () => () => void, dep: any[]): void
}